// .eslintrc.js
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      project: ['./frontend/tsconfig.json', './backend/tsconfig.json'],
      tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
      'standard-with-typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier',
    ],
    rules: {

    },
  };
  