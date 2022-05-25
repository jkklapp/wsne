module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: false,
    },
    parser: '@babel/eslint-parser',
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false,
    },
  },

  root: true,

  env: {
    node: true,
    jest: true,
  },

  ignorePatterns: ['.eslintrc.js'],

  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
  },
};
