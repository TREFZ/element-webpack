const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');

const commonConfig = require('./.webpack/webpack.common');
const prodConfig = require('./.webpack/webpack.prod');
const devConfig = require('./.webpack/webpack.dev');

if (fs.existsSync(path.join(__dirname, '..', '..', 'element-boilerplate', '.webpack/webpack.common'))) {
  console.log('brandCommonConfig exists');
} else {
  console.log('brandCommonConfig DOES NOT exist');
}

console.log('require.main.filename: ', require.main.filename);

// const brandCommonConfig =

const outputConfig = (process.env.NODE_ENV === 'development')
  ? merge(commonConfig, devConfig)
  : merge(commonConfig, prodConfig);

module.exports = outputConfig;
