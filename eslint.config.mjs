import globals from 'globals';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs}'] },
  {
    files: ['**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  js.configs.recommended, // Spread the recommended config from @eslint/js
  prettierConfig, // Spread the prettier config to disable conflicting rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      prettier, // Add prettier as a plugin
    },
    rules: {
      'prettier/prettier': 'error', // Enforce Prettier as an ESLint rule
    },
  },
];
