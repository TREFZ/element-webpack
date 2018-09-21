//
// development webpack config
//
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  devtool: 'eval',
  mode: 'development',
  plugins: [
    new ProgressBarPlugin(),
    new HardSourceWebpackPlugin(),
  ],
};
