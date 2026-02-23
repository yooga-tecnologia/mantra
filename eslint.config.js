// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules', 'dist', 'coverage', 'www', '.storybook', 'loader', 'build', 'storybook-static'],
  }, {
    files: ['**/*.{js,ts,tsx,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'prettier': eslintPluginPrettier,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^(h|Fragment)$',
        },
      ],
      'prettier/prettier': 'error',
      'arrow-parens': ['error', 'always'],
    },
  },
  ...storybook.configs["flat/recommended"]
];
