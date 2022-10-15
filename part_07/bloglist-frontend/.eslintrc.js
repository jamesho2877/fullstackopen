module.exports = {
  env: {
    browser: true,
    es2021: true,
    commonjs: true,
    "jest/globals": true,
    "cypress/globals": true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "jest", "cypress"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
    "no-unused-vars": 0,
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/display-name": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
