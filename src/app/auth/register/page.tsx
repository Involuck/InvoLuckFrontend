'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '@/components/pure/feedback/loading/Spinner';
import ErrorMessage from '@/components/pure/feedback/loading/ErrorMessage';
import SuccessMessage from '@/components/pure/feedback/loading/SuccessMessage';
import PrimaryButton from '@/components/pure/button/PrimaryButton';
import TextInput from '@/components/pure/form/TextInput';
import Footer from '@/components/pure/navigation/Footer';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [accept, setAccept] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);

  const isValidName = useMemo(() => name.trim().length >= 2, [name]);
  const isValidEmail = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    [email]
  );

  const hasLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const isValidPassword = hasLen && hasUpper && hasLower && hasDigit;
  const matches = confirm === password && confirm.length > 0;

  const nameState: 'default' | 'error' | 'success' = !touchedName
    ? 'default'
    : isValidName
      ? 'success'
      : 'error';
  const emailState: 'default' | 'error' | 'success' = !touchedEmail
    ? 'default'
    : isValidEmail
      ? 'success'
      : 'error';
  const passwordState: 'default' | 'error' | 'success' = !touchedPassword
    ? 'default'
    : isValidPassword
      ? 'success'
      : 'error';
  const confirmState: 'default' | 'error' | 'success' = !touchedConfirm
    ? 'default'
    : matches
      ? 'success'
      : 'error';

  const requirements = useMemo(
    () => [
      { label: '8+ caracteres', met: hasLen },
      { label: 'Mayúscula', met: hasUpper },
      { label: 'Minúscula', met: hasLower },
      { label: 'Número', met: hasDigit }
    ],
    [hasLen, hasUpper, hasLower, hasDigit]
  );
  const metCount = requirements.filter((r) => r.met).length;

  const canSubmit =
    isValidName &&
    isValidEmail &&
    isValidPassword &&
    matches &&
    accept &&
    !submitting;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSuccess('Cuenta creada. Redirigiendo...');
    setTimeout(() => router.push('/authenticated/dashboard'), 800);
  };

  const Check = ({ ok }: { ok: boolean }) =>
    ok ? (
      <motion.svg
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="h-5 w-5 text-emerald-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </motion.svg>
    ) : (
      <motion.svg
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="h-5 w-5 text-red-500"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </motion.svg>
    );

  return (
    <main className="relative min-h-screen w-full overflow-hidden involuck-bg flex items-center justify-center p-6">
      <div className="involuck-grid -z-10" />
      <div className="involuck-noise -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white shadow-xl shadow-brand-200/60"
          >
            <span className="text-xl font-extrabold">IL</span>
          </motion.div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow">
            Crear cuenta
          </h1>
          <p className="mt-1 text-brand-100/90">Regístrate para comenzar</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white/95 backdrop-blur p-6 shadow-xl shadow-brand-950/30 ring-1 ring-white/40"
        >
          {error && (
            <div className="mb-4">
              <ErrorMessage message={error} />
            </div>
          )}
          {success && (
            <div className="mb-4">
              <SuccessMessage message={success} />
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Nombre
              </label>
              <div className="relative">
                <TextInput
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouchedName(true)}
                  state={nameState}
                />
                {touchedName && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Check ok={nameState === 'success'} />
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Correo
              </label>
              <div className="relative">
                <TextInput
                  type="email"
                  placeholder="tú@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouchedEmail(true)}
                  state={emailState}
                />
                {touchedEmail && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Check ok={emailState === 'success'} />
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Contraseña
              </label>
              <div className="relative">
                <TextInput
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouchedPassword(true)}
                  state={passwordState}
                />
                {touchedPassword && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Check ok={passwordState === 'success'} />
                  </span>
                )}
              </div>
              <div className="mt-2">
                <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200/60">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-500 transition-all"
                    style={{ width: `${(metCount / 4) * 100}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence initial={false}>
                    {requirements.map((req) => (
                      <motion.span
                        key={req.label}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${req.met ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}
                      >
                        {req.met ? (
                          <svg
                            className="h-4 w-4 text-emerald-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-4 w-4 text-neutral-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <circle cx="10" cy="10" r="4" />
                          </svg>
                        )}
                        {req.label}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700">
                Confirmar contraseña
              </label>
              <div className="relative">
                <TextInput
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onBlur={() => setTouchedConfirm(true)}
                  state={confirmState}
                />
                {touchedConfirm && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <Check ok={confirmState === 'success'} />
                  </span>
                )}
              </div>
            </div>

            <label className="mt-2 flex items-center gap-3 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={accept}
                onChange={(e) => setAccept(e.target.checked)}
                className="h-4 w-4 rounded border-neutral-300 text-brand-600 focus:ring-brand-500"
              />
              <span>
                Acepto las{' '}
                <Link className="underline" href="/terms">
                  Condiciones
                </Link>{' '}
                y la{' '}
                <Link className="underline" href="/privacy">
                  Política de Privacidad
                </Link>
              </span>
            </label>

            <motion.div
              whileHover={{ scale: canSubmit ? 1.01 : 1 }}
              whileTap={{ scale: canSubmit ? 0.99 : 1 }}
            >
              <PrimaryButton
                disabled={!canSubmit}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Spinner size="small" />
                    <span>Creando cuenta...</span>
                  </>
                ) : (
                  <span>Crear cuenta</span>
                )}
              </PrimaryButton>
            </motion.div>
          </form>

          <div className="mt-6 text-center text-xs text-neutral-400">
            <div className="flex items-center justify-center gap-3">
              <Link href="/auth/login" className="hover:underline">
                ¿Ya tienes cuenta? Iniciar sesión
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </main>
  );
}
