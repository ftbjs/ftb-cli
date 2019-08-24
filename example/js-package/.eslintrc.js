module.exports = {
  root: true,
  extends: [
    "plugin:prettier/recommended"
  ],
  plugins: ["prettier"],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 7,
    parser: "babel-eslint",
    ecmaFeatures: {
      "modules": true
    }
  },
  env: {
    browser: true
  }
}