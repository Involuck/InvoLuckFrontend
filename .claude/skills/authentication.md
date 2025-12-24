# Authentication - InvoLuck Frontend

## Overview

This skill covers the authentication system, including the AuthContext,
login/register hooks, and protected routes.

## Architecture

### AuthContext

Location: `src/context/AuthContext.tsx`

The AuthContext manages:

- User authentication state
- Login form state and validation
- Register form state and validation
- Token management (localStorage)

### Protected Routes

Location: `src/app/(authenticated)/`

All routes under `(authenticated)` group require authentication via middleware.

## Using Authentication

### AuthProvider Setup

The AuthProvider wraps the app in `src/app/layout.tsx`:

```typescript
<ThemeProvider>
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
</ThemeProvider>
```

### useAuth Hook

Access authentication state anywhere in the app:

```typescript
import { useAuth } from '@/context/AuthContext';

const MyComponent = () => {
  const {
    // Auth state
    auth: { user, isAuthenticated, isLoading, error },

    // Actions
    logout,
    clearErrors,
    checkAuthStatus
  } = useAuth();

  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Redirect to="/auth/login" />;

  return <div>Welcome, {user?.name}</div>;
};
```

## Login Implementation

### useLogin Hook

Location: `src/hooks/useLogin.ts`

```typescript
import { useLogin } from '@/hooks/useLogin';

const LoginPage = () => {
  const {
    // Form state
    email,
    password,
    showPassword,
    rememberMe,

    // Validation state
    touchedEmail,
    touchedPassword,
    isValidEmail,
    isValidPassword,
    emailState,      // 'default' | 'error' | 'success'
    passwordState,   // 'default' | 'error' | 'success'
    canSubmit,

    // Request state
    submitting,
    error,
    success,

    // Setters
    setEmail,
    setPassword,
    setShowPassword,
    setRememberMe,
    setTouchedEmail,
    setTouchedPassword,

    // Submit handler
    onSubmit
  } = useLogin();

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouchedEmail(true)}
        state={emailState}
        placeholder="tu@empresa.com"
      />

      <TextInput
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => setTouchedPassword(true)}
        state={passwordState}
        placeholder="********"
      />

      <button
        type="submit"
        disabled={!canSubmit || submitting}
      >
        {submitting ? 'Verificando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};
```

## Register Implementation

### useRegister Hook

Location: `src/hooks/useRegister.ts`

```typescript
import { useRegister } from '@/hooks/useRegister';

const RegisterPage = () => {
  const {
    // Form state
    name,
    email,
    password,
    confirmPassword,
    acceptTerms,
    showPassword,
    showConfirmPassword,

    // Validation state
    touchedName,
    touchedEmail,
    touchedPassword,
    touchedConfirmPassword,
    nameState,
    emailState,
    passwordState,
    confirmPasswordState,

    // Password requirements
    passwordRequirements,  // Array of { label: string, met: boolean }
    passwordStrength,      // 0-100

    // Error display helpers
    showNameError,
    showEmailError,
    showPasswordError,
    showConfirmPasswordError,

    // Request state
    canSubmit,
    submitting,
    error,
    success,

    // Setters
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

    // Submit handler
    onSubmit
  } = useRegister();

  return (
    <form onSubmit={onSubmit}>
      {/* Form fields... */}

      {/* Password requirements display */}
      <div className="grid grid-cols-2 gap-1 text-xs">
        {passwordRequirements.map((req, i) => (
          <div
            key={i}
            className={req.met ? 'text-green-600' : 'text-gray-500'}
          >
            {req.met ? '✓' : '✗'} {req.label}
          </div>
        ))}
      </div>

      {/* Password strength bar */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1.5 flex-1 rounded-full ${
              level <= passwordStrength / 25
                ? passwordStrength <= 50 ? 'bg-red-500'
                : passwordStrength <= 75 ? 'bg-yellow-500'
                : 'bg-green-500'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </form>
  );
};
```

## Password Requirements

The register form validates passwords against these requirements:

```typescript
const passwordRequirements = [
  { label: '8+ caracteres', met: password.length >= 8 },
  { label: 'Mayúscula', met: /[A-Z]/.test(password) },
  { label: 'Minúscula', met: /[a-z]/.test(password) },
  { label: 'Número', met: /\d/.test(password) },
  { label: 'Especial (!@#$...)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
];
```

## Input State Types

```typescript
type InputState = 'default' | 'error' | 'success';

// Used for visual feedback on form fields
// - default: Normal appearance
// - error: Red border, error icon
// - success: Green border, checkmark icon
```

## Middleware Protection

Location: `src/middleware.ts`

The middleware checks authentication for protected routes:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/invoices') ||
    request.nextUrl.pathname.startsWith('/clients');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
```

## TypeScript Types

Location: `src/types/auth.ts`

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

interface LoginState {
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
  emailState: InputState;
  passwordState: InputState;
  canSubmit: boolean;
}

interface RegisterState {
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
  // ... validation states
  passwordRequirements: PasswordRequirement[];
  passwordStrength: number;
  canSubmit: boolean;
}
```

## Development Credentials

For development/testing:

- Email: `dev@involuck.com`
- Password: `Involuck123`

## Best Practices

1. **Always use hooks**: Use `useLogin()` or `useRegister()` instead of
   accessing AuthContext directly for forms
2. **Handle loading states**: Show spinners during authentication requests
3. **Display validation feedback**: Use `emailState`, `passwordState` for visual
   feedback
4. **Touch tracking**: Only show errors after field is touched (`onBlur`)
5. **Disable submit**: Use `canSubmit` to prevent invalid form submissions
6. **Clear errors**: Call `clearErrors()` when navigating away from auth pages
