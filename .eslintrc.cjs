/** @type {import ('eslint').ESLint.ConfigData} */
const config = {
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier'],
  plugins: ['@typescript-eslint'],
  rules: {
    'arrow-body-style': ['error', 'always'],
    curly: 'error',
    'default-case': 'error',
    eqeqeq: ['error', 'always'],
    'no-console': 'warn',
    'no-nested-ternary': 'error',
    'no-unused-vars': 'off',
    'no-var': 'error',
    'prefer-template': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
  },
  ignorePatterns: ['src/lib/pathpida/{$path, pathnames}.ts'],
}

module.exports = config
