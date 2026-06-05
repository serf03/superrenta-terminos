import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { deleteAllUserData } from '../services/deleteAccount';

function DeleteAccountFlow() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Inicio de sesión cancelado');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Permite las ventanas emergentes en tu navegador');
      } else {
        setError('Error al iniciar sesión con Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirmText !== 'ELIMINAR') return;
    setError('');
    setDeleting(true);
    try {
      const result = await deleteAllUserData();
      if (result.success) {
        setDeleted(true);
      } else {
        setError(result.error || 'Error al eliminar la cuenta');
      }
    } catch (err: any) {
      setError(err.message || 'Error inesperado');
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setConfirmText('');
    setError('');
  };

  if (deleted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#05944F] flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-heading mb-2">Cuenta eliminada</h2>
        <p className="text-body mb-8">
          Todos tus datos han sido eliminados permanentemente de SuperRenta.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-heading text-white font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-lg font-bold text-heading mb-1">Iniciar sesión</h2>
          <p className="text-sm text-muted">
            Ingresa con tu cuenta de Google vinculada a SuperRenta
          </p>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-glass-border text-heading font-bold text-sm hover:bg-stone-50 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          {loading ? 'Conectando...' : 'Continuar con Google'}
        </button>

        {error && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-[#E11900]/8 text-[#E11900] text-sm">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-lg font-bold text-heading mb-1">Confirmar eliminación</h2>
        <p className="text-sm text-muted">
          Sesión activa como <span className="text-heading font-medium">{user.email}</span>
        </p>
      </div>

      <div className="p-4 rounded-xl bg-[#E11900]/8 border border-[#E11900]/15 mb-6">
        <h3 className="text-sm font-bold text-[#E11900] mb-2">⚠ Esto no se puede deshacer</h3>
        <ul className="text-sm text-[#E11900]/80 space-y-1">
          <li>• Se eliminarán todas tus propiedades publicadas</li>
          <li>• Se eliminarán todos tus comentarios</li>
          <li>• Se eliminarán todas las imágenes asociadas</li>
          <li>• Se eliminará tu perfil de usuario</li>
          <li>• Se eliminará tu cuenta de Firebase Auth</li>
        </ul>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-bold text-muted uppercase tracking-wide mb-1.5">
          Escribe <span className="text-[#E11900]">ELIMINAR</span> para confirmar
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-glass-border bg-white/70 text-heading text-sm placeholder-muted-light focus:outline-none focus:ring-2 focus:ring-[#E11900]/30 transition"
          placeholder="ELIMINAR"
        />
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-[#E11900]/8 text-[#E11900] text-sm mb-6">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleLogout}
          className="flex-1 py-3.5 rounded-2xl border border-glass-border bg-white/70 text-heading font-bold text-sm hover:bg-white transition"
        >
          Cancelar
        </button>
        <button
          onClick={handleDelete}
          disabled={confirmText !== 'ELIMINAR' || deleting}
          className="flex-1 py-3.5 rounded-2xl bg-[#E11900] text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deleting ? 'Eliminando...' : 'Eliminar cuenta'}
        </button>
      </div>
    </div>
  );
}

export default function DeleteAccountPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 sm:px-8 py-8">
      <div className="bg-[rgba(255,255,255,0.92)] rounded-3xl border border-[rgba(255,255,255,0.9)] p-6 sm:p-8"
        style={{ boxShadow: '0 12px 24px rgba(26,32,37,0.06)' }}
      >
        <DeleteAccountFlow />
      </div>
      <div className="text-center mt-6">
        <Link to="/" className="text-sm text-muted hover:text-heading transition-colors">
          ← Volver a Términos y Condiciones
        </Link>
      </div>
    </main>
  );
}
