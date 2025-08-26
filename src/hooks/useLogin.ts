import { useAuth } from '@/context/AuthContext';

export const useLogin = () => {
  const {
    login,
    setLoginEmail,
    setLoginPassword,
    setShowLoginPassword,
    setRememberMe,
    setTouchedLoginEmail,
    setTouchedLoginPassword,
    handleLogin,
  } = useAuth();

  return {
    // State
    email: login.email,
    password: login.password,
    showPassword: login.showPassword,
    rememberMe: login.rememberMe,
    submitting: login.submitting,
    error: login.error,
    success: login.success,
    touchedEmail: login.touchedEmail,
    touchedPassword: login.touchedPassword,
    isValidEmail: login.isValidEmail,
    isValidPassword: login.isValidPassword,
    emailState: login.emailState,
    passwordState: login.passwordState,
    canSubmit: login.canSubmit,
    
    // Actions
    setEmail: setLoginEmail,
    setPassword: setLoginPassword,
    setShowPassword: setShowLoginPassword,
    setRememberMe,
    setTouchedEmail: setTouchedLoginEmail,
    setTouchedPassword: setTouchedLoginPassword,
    onSubmit: handleLogin,
  };
};
