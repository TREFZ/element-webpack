const merge = require('webpack-merge');
const prodConfig = require('./.webpack/webpack.prod.js');
const devConfig = require('./.webpack/webpack.dev.js');
const commonConfig = require('./.webpack/webpack.common');

const outputConfig = (process.env.NODE_ENV === 'development')
  ? merge(commonConfig, devConfig)
  : merge(commonConfig, prodConfig);

module.exports = outputConfig;
