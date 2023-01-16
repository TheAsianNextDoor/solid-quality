/** @type {import ('eslint').ESLint.ConfigData} */
module.exports = {
  env: {
    browser: true,
    node: true,
    'vitest-globals/env': true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.2.0',
    },
  },
  ignorePatterns: ['**/node_modules/**'],
  plugins: [],
  extends: [
    'airbnb-base',
    'plugin:vitest-globals/recommended',
    'plugin:prettier/recommended', // must be at bottom of list
  ],
  rules: {
    // import
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
  },
  overrides: [
    /** TypeScript File Config */
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      extends: ['airbnb-typescript/base', 'plugin:@typescript-eslint/recommended', 'plugin:solid/typescript'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',

        '@typescript-eslint/no-throw-literal': 'off', // turn off for solid server response errors

        // disable rules for '_'
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/naming-convention': [
          'off',
          {
            selector: 'variable',
            format: null,
            custom: {
              regex: '^_$',
              match: false,
            },
          },
        ],

        'import/no-extraneous-dependencies': [
          'error',
          {
            peerDependencies: ['**/test/**/*', '**/*.test.*', '**/*.spec.*'],
            devDependencies: ['**/test/**/*', '**/*.test.*', '**/*.spec.*', 'vite.config.ts'],
          },
        ],
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.eslint.json',
          },
        },
      },
    },
  ],
};
