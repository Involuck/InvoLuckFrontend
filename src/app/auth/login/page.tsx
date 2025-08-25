'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Spinner from '@/components/pure/feedback/loading/Spinner';
import ErrorMessage from '@/components/pure/feedback/loading/ErrorMessage';
import SuccessMessage from '@/components/pure/feedback/loading/SuccessMessage';
import PrimaryButton from '@/components/pure/button/PrimaryButton';
import TextInput from '@/components/pure/form/TextInput';

const DEV_EMAIL = 'dev@involuck.com';
const DEV_PASSWORD = 'Involuck123';

export default function LoginPage() {
  const [email, setEmail] = useState(DEV_EMAIL);
  const [password, setPassword] = useState(DEV_PASSWORD);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [touchedEmail, setTouchedEmail] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  const isValidEmail = useMemo(() => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, [email]);

  const isValidPassword = password.length >= 6;

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const ok = email === DEV_EMAIL && password === DEV_PASSWORD;

      if (!ok) {
        throw new Error('Credenciales inválidas. Intenta nuevamente.');
      }

      document.cookie = 'token=mock-token; path=/';
      if (rememberMe) {
        document.cookie = 'remember=true; path=/; max-age=2592000';
      }

      setSuccess('¡Bienvenido! Redirigiendo al panel...');

      await new Promise((resolve) => setTimeout(resolve, 650));

      window.location.href = '/authenticated/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden involuck-bg">
      <div className="involuck-grid -z-10" />
      <div className="involuck-noise -z-10" />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full px-4 py-3 md:px-6 md:py-4"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:text-brand-200 transition-colors duration-200"
            >
              <motion.div
                whileHover={{ rotate: -5 }}
                className="flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="font-medium text-sm">Regresar al inicio</span>
              </motion.div>
            </Link>
          </motion.div>

          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-sm text-white/80"
            >
              <Link href="/help" className="hover:text-white transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      <div className="flex-1 max-w-6xl mx-auto px-4 py-6 md:px-6 md:pb-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-130px)]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="hidden lg:block space-y-6 text-white"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-xl shadow-brand-900/50 ring-2 ring-white/20"
                >
                  <motion.span
                    className="text-xl font-black"
                    animate={{
                      textShadow: [
                        '0 0 0px rgba(255,255,255,0.5)',
                        '0 0 20px rgba(255,255,255,0.8)',
                        '0 0 0px rgba(255,255,255,0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    IL
                  </motion.span>
                </motion.div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black tracking-tight drop-shadow-lg">
                    InvoLuck
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-0.5 w-8 bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <p className="text-lg text-brand-100 font-medium leading-relaxed">
                  Plataforma moderna de facturación para freelancers y empresas
                  de todos los tamaños.
                </p>
                <p className="text-base text-brand-200/80 leading-relaxed">
                  Crea facturas, gestiona clientes y genera PDFs de manera
                  rápida y confiable.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <h3 className="text-lg font-bold text-white mb-4">
                ¿Por qué elegir InvoLuck?
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                    title: 'Facturación Ágil',
                    description:
                      'Crea y envía facturas en minutos con cálculo automático de totales.'
                  },
                  {
                    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                    title: 'Gestión de Clientes',
                    description:
                      'Almacena y organiza información de tus clientes fácilmente.'
                  },
                  {
                    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                    title: 'Dashboard Inteligente',
                    description:
                      'Visualiza totales, seguimiento de pagos y estado de tus facturas.'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-brand-500/20 rounded-lg">
                      <svg
                        className="w-4 h-4 text-brand-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={feature.icon}
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-brand-200/70">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full max-w-sm mx-auto lg:max-w-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:hidden text-center mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 shadow-lg">
                  <span className="text-lg font-black text-white">IL</span>
                </div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  InvoLuck
                </h1>
              </div>
              <p className="text-sm text-brand-200/80">
                Automatización empresarial inteligente
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl bg-white/98 backdrop-blur-xl p-6 md:p-7 shadow-2xl shadow-brand-950/40 ring-1 ring-white/50 border border-white/20"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-neutral-900 mb-1">
                  Iniciar Sesión
                </h2>
                <p className="text-neutral-600 text-sm">
                  Accede a tu panel de control
                </p>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ y: -10, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -10, opacity: 0, scale: 0.9 }}
                    className="mb-5"
                  >
                    <ErrorMessage message={error} />
                  </motion.div>
                )}
                {success && (
                  <motion.div
                    initial={{ y: -10, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -10, opacity: 0, scale: 0.9 }}
                    className="mb-5"
                  >
                    <SuccessMessage message={success} />
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                    <svg
                      className="w-3.5 h-3.5 text-brand-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <TextInput
                      type="email"
                      placeholder="tu@empresa.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouchedEmail(true)}
                      state={emailState}
                      className="pl-3.5 pr-10 py-2.5 text-sm"
                    />
                    <AnimatePresence>
                      {touchedEmail && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="absolute inset-y-0 right-3 flex items-center"
                        >
                          {emailState === 'success' ? (
                            <div className="flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full">
                              <svg
                                className="w-3 h-3 text-emerald-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-5 h-5 bg-red-100 rounded-full">
                              <svg
                                className="w-3 h-3 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          )}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  {touchedEmail && !isValidEmail && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-600 flex items-center gap-1"
                    >
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Por favor ingresa un email válido
                    </motion.p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                    <svg
                      className="w-3.5 h-3.5 text-brand-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Contraseña
                  </label>
                  <div className="relative">
                    <TextInput
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => setTouchedPassword(true)}
                      state={passwordState}
                      className="pl-3.5 pr-16 py-2.5 text-sm"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-0.5 text-neutral-400 hover:text-neutral-600 transition-colors"
                      >
                        {showPassword ? (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.05 8.05m1.878 1.878L12 12m6.95-6.95l-4.242 4.242M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </motion.button>

                      <AnimatePresence>
                        {touchedPassword && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            {passwordState === 'success' ? (
                              <div className="flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full">
                                <svg
                                  className="w-3 h-3 text-emerald-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center w-5 h-5 bg-red-100 rounded-full">
                                <svg
                                  className="w-3 h-3 text-red-600"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            )}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                      />
                      <motion.div
                        animate={{
                          backgroundColor: rememberMe ? '#059669' : '#e5e7eb',
                          borderColor: rememberMe ? '#059669' : '#d1d5db'
                        }}
                        className="w-4 h-4 border-2 rounded flex items-center justify-center"
                      >
                        <AnimatePresence>
                          {rememberMe && (
                            <motion.svg
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="w-2.5 h-2.5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                    <span className="text-xs font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                      Recordarme
                    </span>
                  </motion.label>

                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      href="/auth/forgot-password"
                      className="text-xs font-medium text-brand-600 hover:text-brand-700 hover:underline transition-all duration-200"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-1"
                >
                  <PrimaryButton
                    disabled={!canSubmit}
                    className={`w-full h-10 flex items-center justify-center gap-2 text-sm font-semibold rounded-lg transition-all duration-300 transform ${
                      canSubmit
                        ? 'bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-lg hover:shadow-xl hover:shadow-brand-500/25'
                        : 'bg-neutral-300 cursor-not-allowed'
                    }`}
                  >
                    {submitting ? (
                      <>
                        <Spinner size="small" />
                        <span>Verificando...</span>
                      </>
                    ) : (
                      <>
                        <span>Iniciar Sesión</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                          />
                        </svg>
                      </>
                    )}
                  </PrimaryButton>
                </motion.div>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-neutral-600 mb-3 flex items-center justify-center gap-2">
                  ¿No tienes una cuenta?
                  <Link
                    href="/auth/register"
                    className="text-brand-600 hover:text-brand-700 hover:underline transition-all duration-200"
                  >
                    Regístrate
                  </Link>
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
                <Link
                  href="/privacy"
                  className="hover:text-neutral-700 transition-colors"
                >
                  Privacidad
                </Link>
                <div className="w-1 h-1 bg-neutral-300 rounded-full"></div>
                <Link
                  href="/terms"
                  className="hover:text-neutral-700 transition-colors"
                >
                  Términos
                </Link>
                <div className="w-1 h-1 bg-neutral-300 rounded-full"></div>
                <Link
                  href="/support"
                  className="hover:text-neutral-700 transition-colors"
                >
                  Soporte
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
