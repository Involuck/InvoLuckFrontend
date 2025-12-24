# Testing - InvoLuck Frontend

## Overview

This skill covers testing strategies including unit tests with Jest, integration
tests, and E2E tests with Playwright.

## Test Structure

```
src/__tests__/
├── unit/                    # Jest unit tests
│   └── components/
│       └── pure/
│           └── button/
│               └── PrimaryButton.test.tsx
├── integration/             # Jest integration tests
│   ├── auth/
│   │   └── LoginPage.test.tsx
│   └── dashboard/
│       └── DashboardPage.test.tsx
└── e2e/                     # Playwright E2E tests
    ├── home/
    │   └── HomePage.test.ts
    └── auth.spec.ts
```

## Running Tests

```bash
# Run all tests
npm run test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run with coverage
npm run test:unit -- --coverage
```

## Unit Tests

### Configuration

Location: `jest.config.js`

```javascript
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/__tests__/unit/**/*.test.[jt]s?(x)',
    '**/__tests__/integration/**/*.test.[jt]s?(x)'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/__tests__/e2e/'
  ]
};
```

### Setup File

Location: `jest.setup.js`

```javascript
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} />
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});
```

### Writing Unit Tests

```typescript
// src/__tests__/unit/components/pure/button/PrimaryButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from '@/components/pure/button/PrimaryButton';

describe('PrimaryButton', () => {
  it('renders the text correctly', () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<PrimaryButton onClick={handleClick}>Click</PrimaryButton>);

    fireEvent.click(screen.getByText('Click'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<PrimaryButton disabled>Disabled</PrimaryButton>);

    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<PrimaryButton className="custom-class">Button</PrimaryButton>);

    expect(screen.getByText('Button')).toHaveClass('custom-class');
  });
});
```

### Testing Form Components

```typescript
// src/__tests__/unit/components/pure/form/TextInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from '@/components/pure/form/TextInput';

describe('TextInput', () => {
  it('renders with placeholder', () => {
    render(<TextInput placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test' }
    });

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error state correctly', () => {
    render(<TextInput state="error" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('shows success state correctly', () => {
    render(<TextInput state="success" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-green-500');
  });
});
```

## Integration Tests

### Testing Pages with Context

```typescript
// src/__tests__/integration/auth/LoginPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/app/auth/login/page';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </ThemeProvider>
  );
};

describe('LoginPage', () => {
  it('renders the form with inputs and button', () => {
    renderWithProviders(<LoginPage />);

    expect(screen.getByPlaceholderText(/tu@empresa.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
  });

  it('displays error for invalid credentials', async () => {
    renderWithProviders(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/tu@empresa.com/i), {
      target: { value: 'wrong@email.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: 'wrongpassword' }
    });

    fireEvent.click(screen.getByText(/iniciar sesión/i));

    await waitFor(() => {
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });
  });

  it('submits with valid credentials', async () => {
    const mockRouter = { push: jest.fn() };
    jest.mock('next/navigation', () => ({
      useRouter: () => mockRouter
    }));

    renderWithProviders(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/tu@empresa.com/i), {
      target: { value: 'dev@involuck.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: 'Involuck123' }
    });

    fireEvent.click(screen.getByText(/iniciar sesión/i));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard');
    });
  });
});
```

### Testing Dashboard Components

```typescript
// src/__tests__/integration/dashboard/DashboardPage.test.tsx
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/(authenticated)/dashboard/page';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </ThemeProvider>
  );
};

describe('DashboardPage', () => {
  it('renders metric cards', () => {
    renderWithProviders(<DashboardPage />);

    expect(screen.getByText('Facturas Totales')).toBeInTheDocument();
    expect(screen.getByText('Ingresos del Mes')).toBeInTheDocument();
    expect(screen.getByText('Clientes Activos')).toBeInTheDocument();
  });

  it('renders welcome hero', () => {
    renderWithProviders(<DashboardPage />);

    expect(screen.getByText(/buenos días|buenas tardes|buenas noches/i)).toBeInTheDocument();
  });

  it('renders quick actions', () => {
    renderWithProviders(<DashboardPage />);

    expect(screen.getByText('Acciones Rápidas')).toBeInTheDocument();
    expect(screen.getByText('Crear Factura')).toBeInTheDocument();
  });
});
```

## E2E Tests (Playwright)

### Configuration

Location: `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__/e2e',
  timeout: 120 * 1000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
```

### Writing E2E Tests

```typescript
// src/__tests__/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/auth/login');

    await expect(page.getByText('Iniciar Sesión')).toBeVisible();
    await expect(page.getByPlaceholder('tu@empresa.com')).toBeVisible();
  });

  test('should show error for invalid login', async ({ page }) => {
    await page.goto('/auth/login');

    await page.fill('[placeholder="tu@empresa.com"]', 'wrong@email.com');
    await page.fill('[placeholder="••••••••••••"]', 'wrongpassword');
    await page.click('button:has-text("Iniciar Sesión")');

    await expect(page.getByText('Credenciales inválidas')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.goto('/auth/login');

    await page.fill('[placeholder="tu@empresa.com"]', 'dev@involuck.com');
    await page.fill('[placeholder="••••••••••••"]', 'Involuck123');
    await page.click('button:has-text("Iniciar Sesión")');

    await expect(page).toHaveURL('/dashboard');
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL('/auth/login');
  });
});
```

### Testing Navigation

```typescript
// src/__tests__/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.fill('[placeholder="tu@empresa.com"]', 'dev@involuck.com');
    await page.fill('[placeholder="••••••••••••"]', 'Involuck123');
    await page.click('button:has-text("Iniciar Sesión")');
    await page.waitForURL('/dashboard');
  });

  test('should navigate to invoices page', async ({ page }) => {
    await page.click('text=Facturas');
    await expect(page).toHaveURL('/invoices');
  });

  test('should navigate to clients page', async ({ page }) => {
    await page.click('text=Clientes');
    await expect(page).toHaveURL('/clients');
  });

  test('should toggle sidebar on desktop', async ({ page }) => {
    const sidebar = page.locator('[data-testid="sidebar"]');
    const toggleButton = page.locator('[data-testid="sidebar-toggle"]');

    await toggleButton.click();
    await expect(sidebar).toHaveClass(/collapsed/);
  });
});
```

## Testing Best Practices

1. **Test behavior, not implementation**: Focus on what the component does, not
   how
2. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over
   `getByTestId`
3. **Mock external dependencies**: Mock API calls, navigation, localStorage
4. **Test accessibility**: Use `toHaveAccessibleName`, `toBeVisible`
5. **Keep tests isolated**: Each test should be independent
6. **Use meaningful assertions**: Test the actual user experience
7. **Handle async operations**: Use `waitFor`, `findBy` for async updates

## Common Mocking Patterns

```typescript
// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'test' }),
    ok: true
  })
);

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  disconnect = jest.fn();
  unobserve = jest.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver
});
```
