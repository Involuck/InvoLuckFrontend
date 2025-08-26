module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],

  // --- SOLUCIÓN AÑADIDA AQUÍ ---
  // Este bloque "overrides" aplica reglas especiales solo a ciertos archivos.
  overrides: [
    {
      // Aplica la siguiente regla solo a los archivos .js que están en la raíz del proyecto.
      files: ['*.js'],
      rules: {
        // En estos archivos (como jest.config.js), sí permitimos el uso de `require()`.
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],
  // --- FIN DE LA SOLUCIÓN ---

  // Tus reglas personalizadas originales se mantienen para el resto del proyecto.
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'comma-dangle': ['error', 'never']
  }
};