# CI Pipeline Documentation

Comprehensive CI pipeline ensuring code quality, security, and performance for
every commit and pull request.

## 🚀 Quick Start

**Before committing changes:**

```bash
npm run check  # Complete quality check
```

**Minimum requirement:**

```bash
npm run format  # Ensure proper formatting
```

## 📋 Available Scripts

| Command                    | Description                            |
| -------------------------- | -------------------------------------- |
| `npm run lint`             | Check code quality with ESLint         |
| `npm run lint:fix`         | Auto-fix ESLint issues                 |
| `npm run format`           | Format code with Prettier              |
| `npm run format:check`     | Verify code formatting                 |
| `npm run test:unit`        | Run unit tests with coverage           |
| `npm run test:integration` | Run integration tests                  |
| `npm run test:e2e`         | Run end-to-end tests                   |
| `npm run test`             | Run all tests                          |
| `npm run check`            | Complete check (format + lint + tests) |

## 🔄 CI Workflow

Triggers on `main` branch pushes and pull requests. Uses concurrency control to
cancel previous runs.

## 📊 Pipeline Jobs

### 1. Setup Dependencies

Sets up Node.js 20, caches dependencies and Playwright browsers for faster
subsequent runs.

### 2. Linters & Code Quality

- ESLint code quality checks
- Prettier formatting verification
- TypeScript compilation check

### 3. Unit Tests

Runs tests in `src/__tests__/unit/` with coverage reports. Uploads coverage to
Codecov.

### 4. Integration Tests

Executes tests in `src/__tests__/integration/` for component and API testing.

### 5. Build Application

Compiles Next.js application and caches build artifacts.

### 6. System Tests (E2E)

Runs Playwright tests in 2 parallel shards. Uploads screenshots/videos on
failure.

### 7. Security Scan (Non-blocking)

- npm audit for vulnerabilities
- Snyk security analysis
- Retains reports for 30 days

### 8. Performance Check (Non-blocking)

- Bundle size analysis
- Lighthouse CI performance metrics

## 🛡️ Quality Gates

1. Code formatting (Prettier)
2. Linting (ESLint)
3. Type safety (TypeScript)
4. Test coverage (Unit tests)
5. Build success
6. E2E functionality
7. Security scan
8. Performance monitoring

## 📝 Developer Workflow

### Pre-commit

```bash
npm run check     # Full validation
npm run format    # Minimum requirement
```

### Troubleshooting

```bash
npm run lint:fix        # Fix linting issues
npm run format          # Fix formatting
npm run test:unit       # Debug unit tests
npm run build           # Test build locally
```

## 🔧 Configuration Files

- `.eslintrc.js` - ESLint configuration
- `.prettierrc` - Prettier formatting rules
- `jest.config.js` - Unit/integration test config
- `playwright.config.ts` - E2E test configuration

**Always run `npm run check` before pushing!**
