'use client';

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/pure/feedback/loading/Spinner';
import ErrorMessage from '@/components/pure/feedback/loading/ErrorMessage';
import SuccessMessage from '@/components/pure/feedback/loading/SuccessMessage';
import Footer from '@/components/pure/navigation/Footer';
import PrimaryButton from '@/components/pure/button/PrimaryButton';
import TextInput from '@/components/pure/form/TextInput';
import useTypedText from '@/hooks/useTypedText';

const DEV_EMAIL = 'dev@involuck.com';
const DEV_PASSWORD = 'Involuck123';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(DEV_EMAIL);
  const [password, setPassword] = useState(DEV_PASSWORD);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const slogan = useTypedText(
    'Automatización sin límite, con resultados de excelencia',
    {
      speedMs: 24,
      startDelayMs: 250
    }
  );
  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const isValidEmail = useMemo(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, [email]);

  const isValidPassword = password.length > 0;

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
  const canSubmit = isValidEmail && isValidPassword && !submitting;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    const ok = email === DEV_EMAIL && password === DEV_PASSWORD;
    setSubmitting(false);
    if (!ok) {
      setError('Credenciales inválidas. Intenta nuevamente.');
      return;
    }
    setSuccess('Bienvenido. Redirigiendo al panel...');
    setTimeout(() => router.push('/dashboard'), 650);
  };

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
            InvoLuck
          </h1>
          <p className="mt-1 text-neutral-200">{slogan || ' '}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-white/95 backdrop-blur p-6 shadow-xl shadow-brand-950/30 ring-1 ring-white/40"
        >
          {error && (
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-4"
            >
              <ErrorMessage message={error} />
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-4"
            >
              <SuccessMessage message={success} />
            </motion.div>
          )}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Correo
              </label>
              <div className="relative">
                <TextInput
                  id="email"
                  type="email"
                  placeholder="tú@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouchedEmail(true)}
                  state={emailState}
                />
                {touchedEmail && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    {emailState === 'success' ? (
                      <motion.svg
                        initial={{ scale: 0.8, opacity: 0 }}
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
                        initial={{ scale: 0.8, opacity: 0 }}
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
                    )}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Contraseña
              </label>
              <div className="relative">
                <TextInput
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouchedPassword(true)}
                  state={passwordState}
                />
                {touchedPassword && (
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    {passwordState === 'success' ? (
                      <motion.svg
                        initial={{ scale: 0.8, opacity: 0 }}
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
                        initial={{ scale: 0.8, opacity: 0 }}
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
                    )}
                  </span>
                )}
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
              <PrimaryButton
                disabled={!canSubmit}
                className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Spinner size="small" />
                    <span>Ingresando...</span>
                  </>
                ) : (
                  <span>Ingresar</span>
                )}
              </PrimaryButton>
            </motion.div>
          </form>

          <div className="mt-6 text-center text-xs text-neutral-400">
            <p>
              Dev: {DEV_EMAIL} / {DEV_PASSWORD}
            </p>
            <div className="mt-2">
              <a
                href="/auth/register"
                className="text-brand-400 hover:text-brand-300 hover:underline"
              >
                Crear cuenta
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </main>
  );
}
