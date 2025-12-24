# React Components - InvoLuck Frontend

## Overview
This skill guides you on creating React components following InvoLuck's established patterns and conventions.

## Component Architecture

### Directory Structure
```
src/components/
├── pure/           # Stateless, presentational components
│   ├── button/     # Button variants
│   ├── form/       # Form inputs (TextInput, Select, Switch)
│   ├── feedback/   # Badges, Pills, Toast, Status indicators
│   ├── navbar/     # Navigation bar
│   ├── navigation/ # Footer, Breadcrumb
│   └── overlay/    # Modal, Dialogs
├── dashboard/      # Dashboard-specific components
├── forms/          # Complex form components (DatePicker, FileUploader)
├── layout/         # Layout components (DashboardLayout, Sidebar)
├── ui/             # UI providers and utilities
└── seo/            # SEO components (JsonLd)
```

## Component Patterns

### 1. Pure Components (Preferred for UI elements)
Location: `src/components/pure/`

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  size = 'medium',
  variant = 'primary',
  className = ''
}) => {
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default Button;
```

### 2. Layout Components
Location: `src/components/layout/`

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const PageLayout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {title && (
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          {title}
        </motion.h1>
      )}
      {children}
    </div>
  );
};
```

### 3. Form Components with State
Location: `src/components/forms/`

```typescript
'use client';

import React, { useState } from 'react';
import TextInput from '@/components/pure/form/TextInput';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
  onChange?: (value: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  required = false,
  onChange
}) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [state, setState] = useState<'default' | 'error' | 'success'>('default');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);

    // Validation logic
    if (touched) {
      setState(newValue.length > 0 ? 'success' : 'error');
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <TextInput
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        state={state}
      />
    </div>
  );
};
```

## Export Pattern
Always create an `index.ts` file for component groups:

```typescript
// src/components/pure/button/index.ts
export { default as Button } from './Button';
export { default as PrimaryButton } from './PrimaryButton';
export { default as SecondaryButton } from './SecondaryButton';
export { default as DangerButton } from './DangerButton';
export { default as OutlineButton } from './OutlineButton';
export { default as SuccessButton } from './SuccessButton';
```

## Required Patterns

### 1. Always use 'use client' directive
```typescript
'use client';
// Component code...
```

### 2. Use Framer Motion for animations
```typescript
import { motion, AnimatePresence } from 'framer-motion';

// Hover/tap animations
<motion.div
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
>

// Enter/exit animations
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      Content
    </motion.div>
  )}
</AnimatePresence>
```

### 3. Support Dark Mode
```typescript
// Always include dark: variants
className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
```

### 4. Use Heroicons for icons
```typescript
import {
  PlusIcon,
  UserIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

// Or solid variants
import { HeartIcon } from '@heroicons/react/24/solid';
```

### 5. TypeScript interfaces for all props
```typescript
interface ComponentProps {
  // Required props
  title: string;

  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';

  // Event handlers
  onClick?: () => void;
  onChange?: (value: string) => void;

  // Children
  children?: React.ReactNode;

  // Style overrides
  className?: string;
}
```

## Accessibility Requirements

1. Always include `aria-label` for icon buttons
2. Use semantic HTML elements
3. Include `aria-invalid` for form fields with errors
4. Ensure proper focus states

```typescript
<button
  aria-label="Close menu"
  className="focus:ring-2 focus:ring-purple-500 focus:outline-none"
>
  <XMarkIcon className="h-5 w-5" />
</button>
```

## Testing Components

Create tests in `src/__tests__/unit/components/`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/pure/button/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```
