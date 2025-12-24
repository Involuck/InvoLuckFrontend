# Form Validation - InvoLuck Frontend

## Overview

This skill covers form validation patterns, real-time validation feedback, and
form state management in InvoLuck.

## Validation Architecture

### Input States

```typescript
type InputState = 'default' | 'error' | 'success';

// Visual representation:
// default: Normal border (gray)
// error: Red border, red text, error icon
// success: Green border, green icon
```

### TextInput Component

Location: `src/components/pure/form/TextInput.tsx`

```typescript
interface TextInputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  state?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

// State styling
const stateClasses = {
  default: 'border-gray-200 dark:border-gray-700 focus:ring-purple-500',
  error: 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/20',
  success:
    'border-green-500 focus:ring-green-500 bg-green-50 dark:bg-green-900/20'
};
```

## Validation Patterns

### 1. Email Validation

```typescript
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Usage
const [email, setEmail] = useState('');
const [touchedEmail, setTouchedEmail] = useState(false);
const [emailState, setEmailState] = useState<InputState>('default');

useEffect(() => {
  if (touchedEmail) {
    setEmailState(isValidEmail(email) ? 'success' : 'error');
  }
}, [email, touchedEmail]);
```

### 2. Password Validation

```typescript
interface PasswordRequirement {
  label: string;
  met: boolean;
}

const getPasswordRequirements = (password: string): PasswordRequirement[] => [
  { label: '8+ caracteres', met: password.length >= 8 },
  { label: 'Mayúscula', met: /[A-Z]/.test(password) },
  { label: 'Minúscula', met: /[a-z]/.test(password) },
  { label: 'Número', met: /\d/.test(password) },
  { label: 'Especial (!@#$...)', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
];

const getPasswordStrength = (password: string): number => {
  const requirements = getPasswordRequirements(password);
  const metCount = requirements.filter((r) => r.met).length;
  return (metCount / requirements.length) * 100;
};

const isValidPassword = (password: string): boolean => {
  const requirements = getPasswordRequirements(password);
  return requirements.every((r) => r.met);
};
```

### 3. Name Validation

```typescript
const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};
```

### 4. Confirm Password Validation

```typescript
const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password.length > 0;
};
```

## Form State Management

### Using Context (AuthContext pattern)

```typescript
// State structure
interface FormState {
  // Field values
  email: string;
  password: string;

  // Touch tracking
  touchedEmail: boolean;
  touchedPassword: boolean;

  // Validation results
  isValidEmail: boolean;
  isValidPassword: boolean;

  // Visual states
  emailState: InputState;
  passwordState: InputState;

  // Form-level state
  canSubmit: boolean;
  submitting: boolean;
  error: string | null;
  success: string | null;
}

// Computed canSubmit
const canSubmit = useMemo(() => {
  return isValidEmail && isValidPassword && !submitting;
}, [isValidEmail, isValidPassword, submitting]);
```

### Using Custom Hook

```typescript
// src/hooks/useFormField.ts
function useFormField<T>(initialValue: T, validator: (value: T) => boolean) {
  const [value, setValue] = useState<T>(initialValue);
  const [touched, setTouched] = useState(false);
  const [state, setState] = useState<InputState>('default');

  const isValid = useMemo(() => validator(value), [value, validator]);

  useEffect(() => {
    if (touched) {
      setState(isValid ? 'success' : 'error');
    }
  }, [isValid, touched]);

  return {
    value,
    setValue,
    touched,
    setTouched,
    state,
    isValid
  };
}

// Usage
const email = useFormField('', isValidEmail);
const password = useFormField('', isValidPassword);
```

## Visual Feedback Components

### Validation Icon

```typescript
<AnimatePresence>
  {touched && (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="absolute inset-y-0 right-3 flex items-center"
    >
      {state === 'success' ? (
        <div className="flex items-center justify-center w-5 h-5 bg-emerald-100 rounded-full">
          <CheckIcon className="w-3 h-3 text-emerald-600" />
        </div>
      ) : (
        <div className="flex items-center justify-center w-5 h-5 bg-red-100 rounded-full">
          <XMarkIcon className="w-3 h-3 text-red-600" />
        </div>
      )}
    </motion.span>
  )}
</AnimatePresence>
```

### Error Message

```typescript
{showError && (
  <motion.p
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-xs text-red-600 flex items-center gap-1"
  >
    <ExclamationCircleIcon className="w-3 h-3" />
    {errorMessage}
  </motion.p>
)}
```

### Password Requirements List

```typescript
<div className="grid grid-cols-2 gap-1 text-xs">
  {passwordRequirements.map((req, index) => (
    <div
      key={index}
      className={`flex items-center gap-1 ${
        req.met
          ? 'text-green-600'
          : showError
            ? 'text-red-600'
            : 'text-neutral-500'
      }`}
    >
      {req.met ? (
        <CheckIcon className="w-3 h-3" />
      ) : (
        <XMarkIcon className="w-3 h-3" />
      )}
      <span>{req.label}</span>
    </div>
  ))}
</div>
```

### Password Strength Bar

```typescript
<div className="flex gap-1">
  {[1, 2, 3, 4].map((level) => (
    <motion.div
      key={level}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: level <= passwordStrength / 25 ? 1 : 0 }}
      transition={{ delay: level * 0.1 }}
      className={`h-1.5 flex-1 rounded-full ${
        level <= passwordStrength / 25
          ? passwordStrength <= 50
            ? 'bg-red-500'
            : passwordStrength <= 75
              ? 'bg-yellow-500'
              : 'bg-green-500'
          : 'bg-neutral-200 dark:bg-neutral-700'
      }`}
    />
  ))}
</div>
```

## Form Submission

### Submit Handler Pattern

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Mark all fields as touched to show errors
  setTouchedEmail(true);
  setTouchedPassword(true);
  setAttemptedSubmit(true);

  // Validate
  if (!canSubmit) {
    return;
  }

  // Submit
  setSubmitting(true);
  setError(null);

  try {
    const response = await apiCall({ email, password });

    if (response.success) {
      setSuccess('¡Operación exitosa!');
      // Redirect or next action
    } else {
      setError(response.error || 'Error desconocido');
    }
  } catch (err) {
    setError('Error de conexión. Intenta de nuevo.');
  } finally {
    setSubmitting(false);
  }
};
```

### Submit Button

```typescript
<PrimaryButton
  disabled={!canSubmit}
  className={`w-full ${
    canSubmit
      ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
      : 'bg-neutral-300 cursor-not-allowed'
  }`}
>
  {submitting ? (
    <>
      <Spinner size="small" />
      <span>Procesando...</span>
    </>
  ) : (
    <span>Enviar</span>
  )}
</PrimaryButton>
```

## Checkbox Validation

### Terms Acceptance

```typescript
const [acceptTerms, setAcceptTerms] = useState(false);

// Validation
const canSubmit = /* other validations */ && acceptTerms;

// Component
<motion.label className="flex items-start gap-2 cursor-pointer">
  <div className="relative">
    <input
      type="checkbox"
      checked={acceptTerms}
      onChange={(e) => setAcceptTerms(e.target.checked)}
      className="sr-only"
    />
    <motion.div
      animate={{
        backgroundColor: acceptTerms ? '#059669' : '#e5e7eb',
        borderColor: acceptTerms ? '#059669' : '#d1d5db'
      }}
      className="w-5 h-5 border-2 rounded flex items-center justify-center"
    >
      <AnimatePresence>
        {acceptTerms && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <CheckIcon className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>
  <span className="text-sm">
    Acepto los <Link href="/terms">Términos</Link>
  </span>
</motion.label>

{attemptedSubmit && !acceptTerms && (
  <p className="text-xs text-red-600">
    Debes aceptar los términos y condiciones
  </p>
)}
```

## Best Practices

1. **Touch-based errors**: Only show errors after field is touched (onBlur)
2. **Real-time validation**: Validate as user types for immediate feedback
3. **Visual states**: Use consistent colors (green=success, red=error)
4. **Accessible errors**: Associate error messages with inputs via
   aria-describedby
5. **Submit prevention**: Disable submit button when form is invalid
6. **Loading states**: Show spinner during submission
7. **Error messages**: Be specific about what's wrong
8. **Success feedback**: Confirm successful actions to user
9. **Attempt tracking**: Track submission attempts to show all errors
10. **Clear errors**: Clear server errors when user modifies form
