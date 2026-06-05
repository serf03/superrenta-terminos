import { deleteUser } from 'firebase/auth';
import { auth } from '../firebase';

export async function deleteAllUserData(): Promise<{ success: boolean; error?: string }> {
  const user = auth.currentUser;
  if (!user) return { success: false, error: 'No hay sesión activa' };

  try {
    const idToken = await user.getIdToken();

    const res = await fetch('/api/delete-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: idToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: data.error || 'Error al eliminar la cuenta' };
    }

    // Delete local auth session
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
