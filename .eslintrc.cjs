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
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'unknown', 'object', 'type'],
      },
    ],

    // misc
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
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

        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
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
