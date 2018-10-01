const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const commonConfig = require('./.webpack/webpack.common');
const prodConfig = require('./.webpack/webpack.prod');
const devConfig = require('./.webpack/webpack.dev');

const cwd = process.cwd();

const configFileCheck = function configFileCheck(filePath) {
  let configFile = null;
  if (fs.existsSync(filePath)) {
    configFile = require(filePath);
  }
  return configFile;
};

const outputConfig = (process.env.NODE_ENV === 'development')
  ? merge(commonConfig,
    configFileCheck(path.join(cwd, '.webpack/webpack.common.js')),
    devConfig,
    configFileCheck(path.join(cwd, '.webpack/webpack.dev.js')))
  : merge(commonConfig,
    configFileCheck(path.join(cwd, '.webpack/webpack.common.js')),
    prodConfig,
    configFileCheck(path.join(cwd, '.webpack/webpack.prod.js')));

module.exports = outputConfig;
