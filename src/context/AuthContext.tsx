'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { AuthContextType, AuthState, LoginState, RegisterState, PasswordRequirement } from '@/types/auth';

const DEV_EMAIL = 'dev@involuck.com';
const DEV_PASSWORD = 'Involuck123';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Auth State
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
    success: null
  })

  // Login State
  const [loginState, setLoginState] = useState<LoginState>({
    email: DEV_EMAIL,
    password: DEV_PASSWORD,
    showPassword: false,
    rememberMe: false,
    submitting: false,
    error: null,
    success: null,
    touchedEmail: false,
    touchedPassword: false,
    isValidEmail: false,
    isValidPassword: false,
    emailState: 'default',
    passwordState: 'default',
    canSubmit: false
  })

  // Register State
  const [registerState, setRegisterState] = useState<RegisterState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    showPassword: false,
    showConfirmPassword: false,
    submitting: false,
    error: null,
    success: null,
    attemptedSubmit: false,
    touchedName: false,
    touchedEmail: false,
    touchedPassword: false,
    touchedConfirmPassword: false,
    isValidName: false,
    isValidEmail: false,
    isValidPassword: false,
    passwordsMatch: false,
    passwordRequirements: [],
    passwordStrength: 0,
    nameState: 'default',
    emailState: 'default',
    passwordState: 'default',
    confirmPasswordState: 'default',
    canSubmit: false
  })

  // Email validation
  const validateEmail = useCallback((email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }, []);

  // Password validation for login
  const validateLoginPassword = useCallback((password: string): boolean => {
    return password.length >= 6;
  }, []);

  // Password validation for register
  const validateRegisterPassword = useCallback((password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const requirements: PasswordRequirement[] = [
      { label: '8+ caracteres', met: hasMinLength },
      { label: 'Mayúscula', met: hasUpperCase },
      { label: 'Minúscula', met: hasLowerCase },
      { label: 'Número', met: hasNumber },
      { label: 'Carácter especial', met: hasSpecialChar }
    ];

    const metRequirements = requirements.filter(req => req.met).length;
    const strength = (metRequirements / 5) * 100;
    const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

    return { requirements, strength, isValid };
  }, []);

  // Update login email validation
  useEffect(() => {
    const isValid = validateEmail(loginState.email);
    const emailState: 'default' | 'error' | 'success' = !loginState.touchedEmail
      ? 'default'
      : isValid
        ? 'success'
        : 'error';

    setLoginState(prev => ({
      ...prev,
      isValidEmail: isValid,
      emailState
    }));
  }, [loginState.email, loginState.touchedEmail, validateEmail]);

  // Update login password validation
  useEffect(() => {
    const isValid = validateLoginPassword(loginState.password);
    const passwordState: 'default' | 'error' | 'success' = !loginState.touchedPassword
      ? 'default'
      : isValid
        ? 'success'
        : 'error';

    setLoginState(prev => ({
      ...prev,
      isValidPassword: isValid,
      passwordState
    }));
  }, [loginState.password, loginState.touchedPassword, validateLoginPassword]);

  // Update login canSubmit
  useEffect(() => {
    const canSubmit = loginState.isValidEmail && loginState.isValidPassword && !loginState.submitting;
    setLoginState(prev => ({ ...prev, canSubmit }));
  }, [loginState.isValidEmail, loginState.isValidPassword, loginState.submitting]);

  // Update register name validation
  useEffect(() => {
    const isValid = registerState.name.trim().length >= 2;
    const showError = (registerState.touchedName || registerState.attemptedSubmit) && !isValid;
    const nameState: 'default' | 'error' | 'success' = showError
      ? 'error'
      : isValid && (registerState.touchedName || registerState.attemptedSubmit)
        ? 'success'
        : 'default';

    setRegisterState(prev => ({
      ...prev,
      isValidName: isValid,
      nameState
    }));
  }, [registerState.name, registerState.touchedName, registerState.attemptedSubmit]);

  // Update register email validation
  useEffect(() => {
    const isValid = validateEmail(registerState.email);
    const showError = (registerState.touchedEmail || registerState.attemptedSubmit) && !isValid;
    const emailState: 'default' | 'error' | 'success' = showError
      ? 'error'
      : isValid && (registerState.touchedEmail || registerState.attemptedSubmit)
        ? 'success'
        : 'default';

    setRegisterState(prev => ({
      ...prev,
      isValidEmail: isValid,
      emailState
    }));
  }, [registerState.email, registerState.touchedEmail, registerState.attemptedSubmit, validateEmail]);

  // Update register password validation
  useEffect(() => {
    const { requirements, strength, isValid } = validateRegisterPassword(registerState.password);
    const showError = (registerState.touchedPassword || registerState.attemptedSubmit) && !isValid;
    const passwordState: 'default' | 'error' | 'success' = showError
      ? 'error'
      : isValid && (registerState.touchedPassword || registerState.attemptedSubmit)
        ? 'success'
        : 'default';

    setRegisterState(prev => ({
      ...prev,
      passwordRequirements: requirements,
      passwordStrength: strength,
      isValidPassword: isValid,
      passwordState
    }));
  }, [registerState.password, registerState.touchedPassword, registerState.attemptedSubmit, validateRegisterPassword]);

  // Update register confirm password validation
  useEffect(() => {
    const passwordsMatch = registerState.password === registerState.confirmPassword && registerState.confirmPassword.length > 0;
    const showError = (registerState.touchedConfirmPassword || registerState.attemptedSubmit) && !passwordsMatch;
    const confirmPasswordState: 'default' | 'error' | 'success' = showError
      ? 'error'
      : passwordsMatch && (registerState.touchedConfirmPassword || registerState.attemptedSubmit)
        ? 'success'
        : 'default';

    setRegisterState(prev => ({
      ...prev,
      passwordsMatch,
      confirmPasswordState
    }));
  }, [registerState.password, registerState.confirmPassword, registerState.touchedConfirmPassword, registerState.attemptedSubmit]);

  // Update register canSubmit
  useEffect(() => {
    const canSubmit = registerState.isValidName &&
      registerState.isValidEmail &&
      registerState.isValidPassword &&
      registerState.passwordsMatch &&
      registerState.acceptTerms &&
      !registerState.submitting;
    setRegisterState(prev => ({ ...prev, canSubmit }));
  }, [
    registerState.isValidName,
    registerState.isValidEmail,
    registerState.isValidPassword,
    registerState.passwordsMatch,
    registerState.acceptTerms,
    registerState.submitting
  ]);

  // Check auth status on mount
  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (token === 'mock-token') {
      setAuth(prev => ({
        ...prev,
        isAuthenticated: true,
        user: { 
          id: '1', 
          email: loginState.email, 
          name: 'Usuario', 
          role: 'user' 
        },
        success: 'Inicio de sesión exitoso',
        error: null
      }));

      setLoginState(prev => ({
        ...prev,
        submitting: false,
        success: 'Inicio de sesión exitoso',
        error: null
      }));
    } else {
      setAuth(prev => ({
        ...prev,
        isAuthenticated: false,
        isLoading: false
      }));
    }
  }, []);

  // Login Actions
  const setLoginEmail = useCallback((email: string) => {
    setLoginState(prev => ({ ...prev, email }))
  }, [])

  const setLoginPassword = useCallback((password: string) => {
    setLoginState(prev => ({ ...prev, password }))
  }, [])

  const setShowLoginPassword = useCallback((show: boolean) => {
    setLoginState(prev => ({ ...prev, showPassword: show }))
  }, [])

  const setRememberMe = useCallback((remember: boolean) => {
    setLoginState(prev => ({ ...prev, rememberMe: remember }))
  }, [])

  const setTouchedLoginEmail = useCallback((touched: boolean) => {
    setLoginState(prev => ({ ...prev, touchedEmail: touched }))
  }, [])

  const setTouchedLoginPassword = useCallback((touched: boolean) => {
    setLoginState(prev => ({ ...prev, touchedPassword: touched }))
  }, [])

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoginState(prev => ({ ...prev, error: null, submitting: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      const ok = loginState.email === DEV_EMAIL && loginState.password === DEV_PASSWORD;

      if (!ok) {
        throw new Error('Credenciales inválidas. Intenta nuevamente.');
      }

      document.cookie = 'token=mock-token; path=/';
      if (loginState.rememberMe) {
        document.cookie = 'remember=true; path=/; max-age=2592000';
      }

      setLoginState(prev => ({ ...prev, success: '¡Bienvenido! Redirigiendo al panel...' }));
      setAuth(prev => ({
        ...prev,
        isAuthenticated: true,
        user: {
          id: '1',
          name: 'Usuario Demo',
          email: DEV_EMAIL,
          role: 'admin'
        }
      }))

      await new Promise((resolve) => setTimeout(resolve, 650));
      window.location.href = '/dashboard';
    } catch (err) {
      setLoginState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Error inesperado'
      }));
    } finally {
      setLoginState(prev => ({ ...prev, submitting: false }));
    }
  }, [loginState.email, loginState.password, loginState.rememberMe]);

  // Register Actions
  const setRegisterName = useCallback((name: string) => {
    setRegisterState(prev => ({ ...prev, name }))
  }, [])

  const setRegisterEmail = useCallback((email: string) => {
    setRegisterState(prev => ({ ...prev, email }))
  }, [])

  const setRegisterPassword = useCallback((password: string) => {
    setRegisterState(prev => ({ ...prev, password }))
  }, [])

  const setConfirmPassword = useCallback((password: string) => {
    setRegisterState(prev => ({ ...prev, confirmPassword: password }))
  }, [])

  const setAcceptTerms = useCallback((accept: boolean) => {
    setRegisterState(prev => ({ ...prev, acceptTerms: accept }))
  }, [])

  const setShowRegisterPassword = useCallback((show: boolean) => {
    setRegisterState(prev => ({ ...prev, showPassword: show }))
  }, [])

  const setShowConfirmPassword = useCallback((show: boolean) => {
    setRegisterState(prev => ({ ...prev, showConfirmPassword: show }))
  }, [])

  const setTouchedRegisterName = useCallback((touched: boolean) => {
    setRegisterState(prev => ({ ...prev, touchedName: touched }))
  }, [])

  const setTouchedRegisterEmail = useCallback((touched: boolean) => {
    setRegisterState(prev => ({ ...prev, touchedEmail: touched }))
  }, [])

  const setTouchedRegisterPassword = useCallback((touched: boolean) => {
    setRegisterState(prev => ({ ...prev, touchedPassword: touched }))
  }, [])

  const setTouchedConfirmPassword = useCallback((touched: boolean) => {
    setRegisterState(prev => ({ ...prev, touchedConfirmPassword: touched }))
  }, [])

  const setAttemptedSubmit = useCallback((attempted: boolean) => {
    setRegisterState(prev => ({ ...prev, attemptedSubmit: attempted }))
  }, [])

  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    setRegisterState(prev => ({
      ...prev,
      attemptedSubmit: true,
      touchedName: true,
      touchedEmail: true,
      touchedPassword: true,
      touchedConfirmPassword: true
    }))

    if (!registerState.canSubmit) return;

    setRegisterState(prev => ({ ...prev, error: null, submitting: true }));

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setRegisterState(prev => ({ ...prev, success: '¡Cuenta creada exitosamente! Redirigiendo...' }));
      setAuth(prev => ({
        ...prev,
        isAuthenticated: true,
        user: {
          id: '2',
          name: registerState.name,
          email: registerState.email,
          role: 'user'
        }
      }));

      document.cookie = 'token=mock-token; path=/';

      await new Promise((resolve) => setTimeout(resolve, 800));
      window.location.href = '/dashboard';
    } catch {
      setRegisterState(prev => ({
        ...prev,
        error: 'Error al crear la cuenta. Intenta nuevamente.'
      }))
    } finally {
      setRegisterState(prev => ({ ...prev, submitting: false }));
    }
  }, [registerState.canSubmit, registerState.name, registerState.email])

  // General Actions
  const logout = useCallback(() => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    setAuth(prev => ({
      ...prev,
      isAuthenticated: false,
      user: null,
      error: null,
      success: null
    }));

    window.location.href = '/auth/login';
  }, []);

  const clearErrors = useCallback(() => {
    setAuth(prev => ({ ...prev, error: null, success: null }));
    setLoginState(prev => ({ ...prev, error: null, success: null }));
    setRegisterState(prev => ({ ...prev, error: null, success: null }));
  }, []);

  const checkAuthStatus = useCallback(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    const isAuthenticated = token === 'mock-token';
    
    setAuth(prev => ({
      ...prev,
      isAuthenticated,
      user: isAuthenticated ? prev.user || {
        id: '1',
        name: 'Usuario Demo',
        email: DEV_EMAIL,
        role: 'admin'
      } : null
    }))

    return isAuthenticated;
  }, []);

  const contextValue = useMemo<AuthContextType>(() => ({
    auth,
    login: loginState,
    register: registerState,
    setLoginEmail,
    setLoginPassword,
    setShowLoginPassword,
    setRememberMe,
    setTouchedLoginEmail,
    setTouchedLoginPassword,
    handleLogin,
    setRegisterName,
    setRegisterEmail,
    setRegisterPassword,
    setConfirmPassword,
    setAcceptTerms,
    setShowRegisterPassword,
    setShowConfirmPassword,
    setTouchedRegisterName,
    setTouchedRegisterEmail,
    setTouchedRegisterPassword,
    setTouchedConfirmPassword,
    setAttemptedSubmit,
    handleRegister,
    logout,
    clearErrors,
    checkAuthStatus
  }), [
    auth,
    loginState,
    registerState,
    setLoginEmail,
    setLoginPassword,
    setShowLoginPassword,
    setRememberMe,
    setTouchedLoginEmail,
    setTouchedLoginPassword,
    handleLogin,
    setRegisterName,
    setRegisterEmail,
    setRegisterPassword,
    setConfirmPassword,
    setAcceptTerms,
    setShowRegisterPassword,
    setShowConfirmPassword,
    setTouchedRegisterName,
    setTouchedRegisterEmail,
    setTouchedRegisterPassword,
    setTouchedConfirmPassword,
    setAttemptedSubmit,
    handleRegister,
    logout,
    clearErrors,
    checkAuthStatus
  ])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
