import { globalIgnores } from 'eslint/config'
import tsEslint from 'typescript-eslint'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default tsEslint.config([
  js.configs.recommended,
  tsEslint.configs.recommended,
  compat.config({
    extends: ['next/core-web-vitals', 'prettier'],
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
      'react-hooks/exhaustive-deps': 'warn',

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
  }),
  globalIgnores([
    'src/lib/pathpida/$path.ts',
    'src/lib/pathpida/pathnames.ts',
    'src/components/ui/**/*',
    'src/**/*.generated.ts',
  ]),
])
