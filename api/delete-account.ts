import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { v2 as cloudinary } from 'cloudinary';
import type { VercelRequest, VercelResponse } from '@vercel/node';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FB_PROJECT_ID,
      clientEmail: process.env.FB_CLIENT_EMAIL,
      privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function extractPublicId(url: string): string | null {
  try {
    const parts = url.split('/');
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
    const idx = parts.indexOf(cloudName);
    if (idx === -1) return null;
    const rest = parts.slice(idx + 1);
    const withoutVersion = rest.filter((p) => !p.startsWith('v'));
    const path = withoutVersion.join('/');
    return path.replace(/\.[^.]+$/, '');
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  try {
    const decoded = await getAuth().verifyIdToken(token);
    const uid = decoded.uid;

    const db = getFirestore();
    const batch = db.batch();
    const imagePublicIds: string[] = [];

    // 1. Delete properties
    const propertiesSnap = await db.collection('properties').where('ownerId', '==', uid).get();
    propertiesSnap.forEach((doc) => {
      const data = doc.data();
      if (Array.isArray(data.images)) {
        data.images.forEach((url: string) => {
          const id = extractPublicId(url);
          if (id) imagePublicIds.push(id);
        });
      }
      batch.delete(doc.ref);
    });

    // 2. Delete comments
    const commentsSnap = await db.collection('comments').where('authorId', '==', uid).get();
    commentsSnap.forEach((doc) => batch.delete(doc.ref));

    // 3. Delete user profile
    batch.delete(db.collection('users').doc(uid));

    // 4. Remove from likedBy arrays
    const likedSnap = await db.collection('properties').where('likedBy', 'array-contains', uid).get();
    likedSnap.forEach((doc) => {
      const data = doc.data();
      const newLikedBy = (data.likedBy || []).filter((id: string) => id !== uid);
      batch.update(doc.ref, {
        likedBy: newLikedBy,
        likes: Math.max(0, (data.likes || 0) - 1),
      });
    });

    await batch.commit();

    // 5. Delete Cloudinary images
    if (imagePublicIds.length > 0) {
      const chunks: string[][] = [];
      for (let i = 0; i < imagePublicIds.length; i += 20) {
        chunks.push(imagePublicIds.slice(i, i + 20));
      }
      await Promise.all(
        chunks.map((chunk) =>
          cloudinary.api.delete_resources(chunk).catch((e) => console.error('Cloudinary delete error:', e)),
        ),
      );
    }

    // 6. Delete Firebase Auth user
    await getAuth().deleteUser(uid);

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error('Delete account error:', err);
    if (err.code === 'auth/id-token-expired') {
      return res.status(401).json({ error: 'Sesión expirada. Vuelve a iniciar sesión.' });
    }
    return res.status(500).json({ error: 'Error al eliminar la cuenta' });
  }
}
