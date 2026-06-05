import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  doc,
} from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { auth, db } from '../firebase';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET;

function extractPublicId(url: string): string | null {
  try {
    const parts = url.split('/');
    const idx = parts.indexOf(CLOUDINARY_CLOUD_NAME);
    if (idx === -1) return null;
    const rest = parts.slice(idx + 1);
    const withoutVersion = rest.filter((p) => !p.startsWith('v'));
    const path = withoutVersion.join('/');
    return path.replace(/\.[^.]+$/, '');
  } catch {
    return null;
  }
}

async function deleteCloudinaryImages(publicIds: string[]): Promise<void> {
  if (publicIds.length === 0) return;

  const timestamp = Math.floor(Date.now() / 1000);
  const idsString = publicIds.join(',');
  const toSign = `public_ids=${idsString}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(CLOUDINARY_API_SECRET);
  const messageData = encoder.encode(toSign);

  const cryptoKey = await globalThis.crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  );
  const signatureBuffer = await globalThis.crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const signatureArray = new Uint8Array(signatureBuffer);
  const signature = Array.from(signatureArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const formData = new URLSearchParams();
  formData.append('public_ids', idsString);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('api_key', CLOUDINARY_API_KEY);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    },
  );

  if (!res.ok) {
    console.error('Cloudinary delete failed:', await res.text());
  }
}

export async function deleteAllUserData(): Promise<{ success: boolean; error?: string }> {
  const user = auth.currentUser;
  if (!user) return { success: false, error: 'No hay sesión activa' };

  try {
    const batch = writeBatch(db);
    const imagePublicIds: string[] = [];

    // 1. Delete properties owned by user
    const propertiesQuery = query(
      collection(db, 'properties'),
      where('ownerId', '==', user.uid),
    );
    const propertiesSnapshot = await getDocs(propertiesQuery);

    propertiesSnapshot.forEach((propDoc) => {
      const data = propDoc.data();
      if (Array.isArray(data.images)) {
        data.images.forEach((url: string) => {
          const id = extractPublicId(url);
          if (id) imagePublicIds.push(id);
        });
      }
      batch.delete(propDoc.ref);
    });

    // 2. Delete comments by user
    const commentsQuery = query(
      collection(db, 'comments'),
      where('authorId', '==', user.uid),
    );
    const commentsSnapshot = await getDocs(commentsQuery);
    commentsSnapshot.forEach((c) => batch.delete(c.ref));

    // 3. Delete user profile
    const userRef = doc(db, 'users', user.uid);
    batch.delete(userRef);

    // 4. Remove user from likedBy arrays in properties
    const likedQuery = query(
      collection(db, 'properties'),
      where('likedBy', 'array-contains', user.uid),
    );
    const likedSnapshot = await getDocs(likedQuery);
    likedSnapshot.forEach((propDoc) => {
      const data = propDoc.data();
      const newLikedBy = (data.likedBy || []).filter((id: string) => id !== user.uid);
      batch.update(propDoc.ref, { likedBy: newLikedBy, likes: Math.max(0, (data.likes || 0) - 1) });
    });

    // 5. Commit batch
    await batch.commit();

    // 6. Delete Cloudinary images
    if (imagePublicIds.length > 0) {
      await deleteCloudinaryImages(imagePublicIds);
    }

    // 7. Delete Firebase Auth account
    await deleteUser(user);

    return { success: true };
  } catch (err: any) {
    if (err.code === 'auth/requires-recent-login') {
      return {
        success: false,
        error: 'Debes volver a iniciar sesión para eliminar tu cuenta por seguridad.',
      };
    }
    console.error('Delete error:', err);
    return { success: false, error: err.message || 'Error al eliminar la cuenta' };
  }
}
