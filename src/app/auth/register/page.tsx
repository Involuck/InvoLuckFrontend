'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from '@/components/pure/feedback/loading/Spinner';
import ErrorMessage from '@/components/pure/feedback/loading/ErrorMessage';
import SuccessMessage from '@/components/pure/feedback/loading/SuccessMessage';
import PrimaryButton from '@/components/pure/button/PrimaryButton';
import TextInput from '@/components/pure/form/TextInput';
import { useRegister } from '@/hooks/useRegister';

export default function RegisterPage() {
  const {
    name,
    email,
    password,
    confirmPassword,
    acceptTerms,
    showPassword,
    showConfirmPassword,
    submitting,
    error,
    success: _success,
    attemptedSubmit,
    touchedName,
    touchedEmail,
    touchedPassword,
    touchedConfirmPassword,
    passwordRequirements,
    passwordStrength,
    nameState,
    emailState,
    passwordState,
    confirmPasswordState,
    canSubmit,
    showNameError,
    showEmailError,
    showPasswordError,
    showConfirmPasswordError,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setAcceptTerms,
    setShowPassword,
    setShowConfirmPassword,
    setTouchedName,
    setTouchedEmail,
    setTouchedPassword,
    setTouchedConfirmPassword,
    setAttemptedSubmit: _setAttemptedSubmit,
    onSubmit
  } = useRegister();

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
              href="/auth/login"
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
                <span className="font-medium text-sm">Iniciar Sesión</span>
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

      <div className="flex-1 max-w-6xl mx-auto px-4 md:px-6">
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center">
          <div className="w-full grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="hidden lg:block lg:col-span-2 space-y-6 text-white"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <motion.img
                    src="/api/logo"
                    alt="InvoLuck logo"
                    className="h-20 lg:h-24 xl:h-28 w-auto object-contain"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                  />
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
                  <p className="text-xl text-brand-100 font-medium leading-relaxed">
                    Únete a miles de empresarios
                  </p>
                  <p className="text-base text-brand-200/80 leading-relaxed">
                    Crea tu cuenta y comienza a facturar de manera profesional
                    en minutos. Diseñado para crecer contigo.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  Beneficios de registrarte
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                      title: 'Gratis para comenzar',
                      description: 'Crea hasta 5 facturas sin costo'
                    },
                    {
                      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                      title: 'Setup en 2 minutos',
                      description: 'Comienza a facturar inmediatamente'
                    },
                    {
                      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                      title: 'Datos seguros',
                      description: 'Encriptación de nivel bancario'
                    }
                  ].map((benefit, index) => (
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
                            d={benefit.icon}
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-brand-200/70">
                          {benefit.description}
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
              className="w-full lg:col-span-3 max-w-xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:hidden text-center mb-6"
              >
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="relative h-16 sm:h-20 w-auto">
                    <Image
                      src="/api/logo"
                      alt="InvoLuck logo"
                      width={80}
                      height={80}
                      className="h-full w-auto object-contain"
                      priority
                    />
                  </div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    InvoLuck
                  </h1>
                </div>
                <p className="text-sm text-brand-200/80">
                  Facturación moderna y escalable
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl bg-white/98 backdrop-blur-xl p-8 shadow-2xl shadow-brand-950/40 ring-1 ring-white/50 border border-white/20"
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    Crear Cuenta
                  </h2>
                  <p className="text-neutral-600 text-sm">
                    Comienza gratis hoy mismo
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
                  {_success && (
                    <motion.div
                      initial={{ y: -10, opacity: 0, scale: 0.9 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -10, opacity: 0, scale: 0.9 }}
                      className="mb-5"
                    >
                      <SuccessMessage message={_success} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <svg
                          className="w-4 h-4 text-brand-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Nombre completo
                      </label>
                      <div className="relative">
                        <TextInput
                          type="text"
                          placeholder="Tu nombre completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          onBlur={() => setTouchedName(true)}
                          state={nameState}
                          className="pl-4 pr-10 py-3 text-sm"
                        />
                        <AnimatePresence>
                          {(touchedName || attemptedSubmit) && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute inset-y-0 right-3 flex items-center"
                            >
                              {nameState === 'success' ? (
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
                              ) : nameState === 'error' ? (
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
                              ) : null}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      {showNameError && (
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
                          El nombre debe tener al menos 2 caracteres
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <svg
                          className="w-4 h-4 text-brand-500"
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
                          className="pl-4 pr-10 py-3 text-sm"
                        />
                        <AnimatePresence>
                          {(touchedEmail || attemptedSubmit) && (
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
                              ) : emailState === 'error' ? (
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
                              ) : null}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      {showEmailError && (
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <svg
                          className="w-4 h-4 text-brand-500"
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
                          className="pl-4 pr-20 py-3 text-sm"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                          >
                            {showPassword ? (
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
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.05 8.05m1.878 1.878L12 12m6.95-6.95l-4.242 4.242M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            ) : (
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
                            {(touchedPassword || attemptedSubmit) && (
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
                                ) : passwordState === 'error' ? (
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
                                ) : null}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {(password.length > 0 || showPasswordError) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            {passwordRequirements.map((req, index) => (
                              <div
                                key={index}
                                className={`flex items-center gap-1 ${
                                  req.met
                                    ? 'text-green-600'
                                    : showPasswordError
                                      ? 'text-red-600'
                                      : 'text-neutral-500'
                                }`}
                              >
                                <svg
                                  className="w-3 h-3"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d={
                                      req.met
                                        ? 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                        : 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                                    }
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{req.label}</span>
                              </div>
                            ))}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-neutral-500">
                                Fuerza:
                              </span>
                              <span
                                className={`text-xs font-medium ${
                                  passwordStrength <= 50
                                    ? 'text-red-600'
                                    : passwordStrength <= 75
                                      ? 'text-yellow-600'
                                      : 'text-green-600'
                                }`}
                              >
                                {passwordStrength <= 50
                                  ? 'Débil'
                                  : passwordStrength <= 75
                                    ? 'Media'
                                    : 'Fuerte'}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map((level) => (
                                <motion.div
                                  key={level}
                                  initial={{ scaleX: 0 }}
                                  animate={{
                                    scaleX:
                                      level <= passwordStrength / 25 ? 1 : 0
                                  }}
                                  transition={{ delay: level * 0.1 }}
                                  className={`h-1.5 flex-1 rounded-full ${
                                    level <= passwordStrength / 25
                                      ? passwordStrength <= 50
                                        ? 'bg-red-500'
                                        : passwordStrength <= 75
                                          ? 'bg-yellow-500'
                                          : 'bg-green-500'
                                      : 'bg-neutral-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <svg
                          className="w-4 h-4 text-brand-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <TextInput
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onBlur={() => setTouchedConfirmPassword(true)}
                          state={confirmPasswordState}
                          className="pl-4 pr-20 py-3 text-sm"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                          >
                            {showConfirmPassword ? (
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
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.05 8.05m1.878 1.878L12 12m6.95-6.95l-4.242 4.242M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            ) : (
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
                            {(touchedConfirmPassword || attemptedSubmit) && (
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                              >
                                {confirmPasswordState === 'success' ? (
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
                                ) : confirmPasswordState === 'error' ? (
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
                                ) : null}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      {showConfirmPasswordError && (
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
                          Las contraseñas no coinciden
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start gap-2 cursor-pointer group mt-1"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(e) => setAcceptTerms(e.target.checked)}
                          className="sr-only"
                        />
                        <motion.div
                          animate={{
                            backgroundColor: acceptTerms
                              ? '#059669'
                              : '#e5e7eb',
                            borderColor: acceptTerms ? '#059669' : '#d1d5db'
                          }}
                          className="w-5 h-5 border-2 rounded flex items-center justify-center"
                        >
                          <AnimatePresence>
                            {acceptTerms && (
                              <motion.svg
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="w-3 h-3 text-white"
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
                    </motion.label>
                    <div className="text-sm text-neutral-700 leading-relaxed">
                      <span>Acepto los </span>
                      <Link
                        href="/terms"
                        className="font-medium text-brand-600 hover:text-brand-700 hover:underline transition-all duration-200"
                      >
                        Términos y Condiciones
                      </Link>
                      <span> y la </span>
                      <Link
                        href="/privacy"
                        className="font-medium text-brand-600 hover:text-brand-700 hover:underline transition-all duration-200"
                      >
                        Política de Privacidad
                      </Link>
                      <span> de InvoLuck.</span>
                    </div>
                  </div>

                  {attemptedSubmit && !acceptTerms && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-600 flex items-center gap-1 -mt-2"
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
                      Debes aceptar los términos y condiciones
                    </motion.p>
                  )}

                  <motion.div
                    whileHover={{ scale: canSubmit ? 1.01 : 1 }}
                    whileTap={{ scale: canSubmit ? 0.98 : 1 }}
                    className="pt-3"
                  >
                    <PrimaryButton
                      disabled={!canSubmit}
                      className={`w-full h-12 flex items-center justify-center gap-2 text-sm font-semibold rounded-xl transition-all duration-300 transform ${
                        canSubmit
                          ? 'bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 shadow-lg hover:shadow-xl hover:shadow-brand-500/25 text-white'
                          : 'bg-neutral-300 cursor-not-allowed text-neutral-600'
                      }`}
                    >
                      {submitting ? (
                        <>
                          <Spinner size="small" />
                          <span>Creando cuenta...</span>
                        </>
                      ) : (
                        <>
                          <span>Crear Cuenta</span>
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
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </>
                      )}
                    </PrimaryButton>
                  </motion.div>
                </form>

                <div className="mt-6 space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-neutral-600 flex items-center justify-center gap-2">
                      ¿Ya tienes una cuenta?
                      <Link
                        href="/auth/login"
                        className="text-brand-600 hover:text-brand-700 hover:underline transition-all duration-200 font-medium"
                      >
                        Iniciar Sesión
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
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
