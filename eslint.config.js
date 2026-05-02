import js from '@eslint/js';
import tslint from 'typescript-eslint';

export default tslint.config(
  {
    ignores: [
      'dist/',
      'node_modules/',
      'build/',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      '*.test.ts',
      '*.test.tsx',
    ],
  },
  js.configs.recommended,
  ...tslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);
