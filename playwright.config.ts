import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/__tests__/e2e',
  timeout: 120000, // Increase overall test timeout to 2 minutes
  expect: { timeout: 20000 }, // Increase expect timeout to 20 seconds
  retries: process.env.CI ? 2 : 0, // Retry tests on CI
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 20000,
    navigationTimeout: 30000, // Add navigation timeout
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: 'http://localhost:3000'
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    timeout: 120 * 1000,
    reuseExistingServer: true,
    cwd: process.cwd()
  }
});
