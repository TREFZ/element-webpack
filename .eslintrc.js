module.exports = {
  extends: 'eslint-config-airbnb',
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    mocha: true,
  },
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'import/prefer-default-export': 0, // Necessary for interop with CommonJS.
    'import/no-dynamic-require': 0, // Necessary for dynamic handlebars helpers.
    'import/no-webpack-loader-syntax': 0, // Used for component-loader.
    'import/extensions': 0, // Import resolver doesn't honor extensions in wpconfig. grr!
    'global-require': 0, // Necessary for dynamic handlebars helpers.
  },
  plugins: ['import'],
};
