import { useAuth } from '@/context/AuthContext';

export const useRegister = () => {
  const {
    register,
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
  } = useAuth();

  return {
    // State
    name: register.name,
    email: register.email,
    password: register.password,
    confirmPassword: register.confirmPassword,
    acceptTerms: register.acceptTerms,
    showPassword: register.showPassword,
    showConfirmPassword: register.showConfirmPassword,
    submitting: register.submitting,
    error: register.error,
    success: register.success,
    attemptedSubmit: register.attemptedSubmit,
    touchedName: register.touchedName,
    touchedEmail: register.touchedEmail,
    touchedPassword: register.touchedPassword,
    touchedConfirmPassword: register.touchedConfirmPassword,
    isValidName: register.isValidName,
    isValidEmail: register.isValidEmail,
    isValidPassword: register.isValidPassword,
    passwordsMatch: register.passwordsMatch,
    passwordRequirements: register.passwordRequirements,
    passwordStrength: register.passwordStrength,
    nameState: register.nameState,
    emailState: register.emailState,
    passwordState: register.passwordState,
    confirmPasswordState: register.confirmPasswordState,
    canSubmit: register.canSubmit,
    
    // Computed values
    showNameError: (register.touchedName || register.attemptedSubmit) && !register.isValidName,
    showEmailError: (register.touchedEmail || register.attemptedSubmit) && !register.isValidEmail,
    showPasswordError: (register.touchedPassword || register.attemptedSubmit) && !register.isValidPassword,
    showConfirmPasswordError: (register.touchedConfirmPassword || register.attemptedSubmit) && !register.passwordsMatch,
    metRequirements: register.passwordRequirements.filter(req => req.met).length,
    
    // Actions
    setName: setRegisterName,
    setEmail: setRegisterEmail,
    setPassword: setRegisterPassword,
    setConfirmPassword,
    setAcceptTerms,
    setShowPassword: setShowRegisterPassword,
    setShowConfirmPassword,
    setTouchedName: setTouchedRegisterName,
    setTouchedEmail: setTouchedRegisterEmail,
    setTouchedPassword: setTouchedRegisterPassword,
    setTouchedConfirmPassword,
    setAttemptedSubmit,
    onSubmit: handleRegister,
  };
};
