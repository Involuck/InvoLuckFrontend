export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ValidationState {
  isValid: boolean;
  isTouched: boolean;
  error?: string;
}

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

export interface LoginState {
  email: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
  submitting: boolean;
  error: string | null;
  success: string | null;
  touchedEmail: boolean;
  touchedPassword: boolean;
  isValidEmail: boolean;
  isValidPassword: boolean;
  emailState: 'default' | 'error' | 'success';
  passwordState: 'default' | 'error' | 'success';
  canSubmit: boolean;
}

export interface RegisterState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  submitting: boolean;
  error: string | null;
  success: string | null;
  attemptedSubmit: boolean;
  touchedName: boolean;
  touchedEmail: boolean;
  touchedPassword: boolean;
  touchedConfirmPassword: boolean;
  isValidName: boolean;
  isValidEmail: boolean;
  isValidPassword: boolean;
  passwordsMatch: boolean;
  passwordRequirements: PasswordRequirement[];
  passwordStrength: number;
  nameState: 'default' | 'error' | 'success';
  emailState: 'default' | 'error' | 'success';
  passwordState: 'default' | 'error' | 'success';
  confirmPasswordState: 'default' | 'error' | 'success';
  canSubmit: boolean;
}

export interface AuthContextType {
  // Auth state
  auth: AuthState;

  // Login state and actions
  login: LoginState;
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  setShowLoginPassword: (show: boolean) => void;
  setRememberMe: (remember: boolean) => void;
  setTouchedLoginEmail: (touched: boolean) => void;
  setTouchedLoginPassword: (touched: boolean) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;

  // Register state and actions
  register: RegisterState;
  setRegisterName: (name: string) => void;
  setRegisterEmail: (email: string) => void;
  setRegisterPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  setAcceptTerms: (accept: boolean) => void;
  setShowRegisterPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  setTouchedRegisterName: (touched: boolean) => void;
  setTouchedRegisterEmail: (touched: boolean) => void;
  setTouchedRegisterPassword: (touched: boolean) => void;
  setTouchedConfirmPassword: (touched: boolean) => void;
  setAttemptedSubmit: (attempted: boolean) => void;
  handleRegister: (e: React.FormEvent) => Promise<void>;

  // General auth actions
  logout: () => void;
  clearErrors: () => void;
  checkAuthStatus: () => void;
}
