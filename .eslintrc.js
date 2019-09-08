module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here (https://eslint.org/docs/user-guide/configuring#configuring-rules)
  rules: {
    'space-before-function-paren': 'off',
    'camelcase': 'warn',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'no-console': 'warn'
  }
}
