/** @type {import ('eslint').ESLint.ConfigData} */
const config = {
  extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier'],
  rules: {
    'arrow-body-style': ['error', 'always'],
    curly: 'error',
    'default-case': 'error',
    eqeqeq: ['error', 'always'],
    'no-console': 'warn',
    'no-nested-ternary': 'error',
    'no-var': 'error',
    'prefer-template': 'error',
  },
  ignorePatterns: ['src/lib/pathpida/$path.ts'],
}

module.exports = config
