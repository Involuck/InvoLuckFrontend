# TypeScript Patterns - InvoLuck Frontend

## Overview

This skill covers TypeScript patterns, type definitions, and best practices used
in InvoLuck.

## TypeScript Configuration

Location: `tsconfig.json`

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Type Definitions

### Location

`src/types/auth.ts` - Main types file

### Core Types

#### User

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}
```

#### Input State

```typescript
type InputState = 'default' | 'error' | 'success';
```

#### Auth State

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}
```

#### Login State

```typescript
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
```

#### Register State

```typescript
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
  nameState: InputState;
  emailState: InputState;
  passwordState: InputState;
  confirmPasswordState: InputState;
  canSubmit: boolean;
  showNameError: boolean;
  showEmailError: boolean;
  showPasswordError: boolean;
  showConfirmPasswordError: boolean;
}
```

#### Password Requirement

```typescript
interface PasswordRequirement {
  label: string;
  met: boolean;
}
```

## Component Props Patterns

### Basic Props Interface

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
```

### Props with Variants

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// With const assertion for type safety
const VARIANTS = ['primary', 'secondary', 'danger', 'outline'] as const;
type Variant = (typeof VARIANTS)[number];
```

### Props with Children

```typescript
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

// For single child
interface WrapperProps {
  children: React.ReactElement;
}
```

### Props extending HTML attributes

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  state?: InputState;
  label?: string;
}

// Usage allows all standard input props
<Input type="email" placeholder="..." state="error" />
```

### Props with Event Handlers

```typescript
interface FormFieldProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

// Generic event handler
interface ClickableProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
```

## Generic Types

### Generic Component

```typescript
interface SelectProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getLabel: (option: T) => string;
  getValue: (option: T) => string;
}

function Select<T>({ options, value, onChange, getLabel, getValue }: SelectProps<T>) {
  return (
    <select
      value={getValue(value)}
      onChange={(e) => {
        const selected = options.find(opt => getValue(opt) === e.target.value);
        if (selected) onChange(selected);
      }}
    >
      {options.map((option) => (
        <option key={getValue(option)} value={getValue(option)}>
          {getLabel(option)}
        </option>
      ))}
    </select>
  );
}
```

### Generic Hook

```typescript
function useFormField<T>(
  initialValue: T,
  validator: (value: T) => boolean
): {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  isValid: boolean;
  touched: boolean;
  setTouched: (touched: boolean) => void;
} {
  const [value, setValue] = useState<T>(initialValue);
  const [touched, setTouched] = useState(false);
  const isValid = useMemo(() => validator(value), [value, validator]);

  return { value, setValue, isValid, touched, setTouched };
}
```

## Context Types

### Context Value Type

```typescript
interface AuthContextType {
  auth: AuthState;
  login: LoginState;
  register: RegisterState;

  // Login setters
  setLoginEmail: (email: string) => void;
  setLoginPassword: (password: string) => void;
  setShowLoginPassword: (show: boolean) => void;
  setRememberMe: (remember: boolean) => void;
  setTouchedLoginEmail: (touched: boolean) => void;
  setTouchedLoginPassword: (touched: boolean) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;

  // Register setters
  setRegisterName: (name: string) => void;
  setRegisterEmail: (email: string) => void;
  // ... more setters

  // Actions
  logout: () => void;
  clearErrors: () => void;
  checkAuthStatus: () => boolean;
}
```

### Creating Typed Context

```typescript
const AuthContext = createContext<AuthContextType | null>(null);

// Hook with null check
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

## Utility Types

### Pick/Omit

```typescript
// Pick specific properties
type LoginCredentials = Pick<LoginState, 'email' | 'password'>;

// Omit specific properties
type UserWithoutDates = Omit<User, 'createdAt' | 'updatedAt'>;
```

### Partial/Required

```typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;
```

### Record

```typescript
// Map of status to color
type StatusColors = Record<InputState, string>;

const statusColors: StatusColors = {
  default: 'gray',
  error: 'red',
  success: 'green'
};
```

### Union Types

```typescript
type Status = 'pending' | 'processing' | 'completed' | 'failed';

type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

## Type Guards

### Custom Type Guard

```typescript
interface Invoice {
  id: string;
  type: 'invoice';
  amount: number;
}

interface Quote {
  id: string;
  type: 'quote';
  validUntil: Date;
}

type Document = Invoice | Quote;

function isInvoice(doc: Document): doc is Invoice {
  return doc.type === 'invoice';
}

// Usage
function processDocument(doc: Document) {
  if (isInvoice(doc)) {
    console.log(doc.amount); // TypeScript knows this is Invoice
  } else {
    console.log(doc.validUntil); // TypeScript knows this is Quote
  }
}
```

### Null Check Guard

```typescript
function assertDefined<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T {
  if (value === null || value === undefined) {
    throw new Error(message || 'Value is not defined');
  }
}

// Usage
const user = getUser();
assertDefined(user, 'User not found');
console.log(user.name); // TypeScript knows user is not null
```

## API Response Types

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Usage
async function fetchUsers(): Promise<PaginatedResponse<User>> {
  const response = await fetch('/api/users');
  return response.json();
}
```

## Best Practices

1. **Enable strict mode**: Always use `"strict": true` in tsconfig
2. **Avoid `any`**: Use `unknown` instead, then narrow with type guards
3. **Use interfaces for objects**: Prefer `interface` over `type` for object
   shapes
4. **Export types**: Keep types in dedicated files and export them
5. **Document complex types**: Use JSDoc comments for non-obvious types
6. **Use const assertions**: For literal types `as const`
7. **Prefer composition**: Combine smaller types instead of large monolithic
   ones
8. **Type event handlers**: Be specific about event types
9. **Use discriminated unions**: For state machines and variants
10. **Avoid type assertions**: Use type guards instead of `as`

```typescript
// Bad
const user = data as User;

// Good
if (isUser(data)) {
  // data is User here
}
```
