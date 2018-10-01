//
// development webpack config
//
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  entry: {
    // TODO: Do this with a transform.
    // The values are the same as common, they just have to be in an array for webpack-hot-client.
    main: [path.join(__dirname, '..', '..', 'element', 'public/src/main-dev.js')],
    style: [path.join(__dirname, '..', '..', 'element', 'public/scss/main.scss')],
    styleguide: [path.join(__dirname, '..', '..', 'element', 'public/scss/styleguide.scss')],
  },
  devtool: 'eval',
  mode: 'development',
  plugins: [
    new ProgressBarPlugin(),
    new HardSourceWebpackPlugin(),
  ],
};
