//
// production webpack config
//

const path = require('path');

module.exports = {
  devtool: 'source-map',
  mode: 'production',
  optimization: {
    concatenateModules: true,
  },
  plugins: [],
};
