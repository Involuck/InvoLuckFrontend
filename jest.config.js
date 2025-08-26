// jest.config.js

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom Jest configuration you want to create here
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (this is required for '@/' import paths)
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/src/__tests__/e2e/'],

  // Define the test file patterns for unit and integration tests
  testMatch: [
    '<rootDir>/src/__tests__/unit/**/*.test.{ts,tsx}',
    '<rootDir>/src/__tests__/integration/**/*.test.{ts,tsx}'
  ]
};

// createJest-Config is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);