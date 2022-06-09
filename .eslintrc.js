module.exports = {
  root: true,
  extends: 'airbnb-typescript/base',
  plugins: ['import', 'prettier', '@typescript-eslint'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
