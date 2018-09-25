// webpack-utils.js
// This file instantiates an instance of webpack-dev-server.
// It is only necessary to include this in `development` mode.
// Assets like css/js are prebuilt for production deploys automatically.
import _ from 'lodash';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import merge from 'webpack-merge';
import devConfig from '../../.webpack/webpack.dev';
import commonConfig from '../../.webpack/webpack.common';

const webpackConfig = merge(commonConfig, devConfig);

const hotClient = require('webpack-hot-client');

let globalWebpackPercent = 0;

export function elementWebpack(app, config) {
  app.use((req, res, next) => {
    // Create webpack dist directory based on environment.
    if (app.get('env') === 'development') {
      res.locals.webpack_dist_dir = 'webpack-dist';
    } else {
      res.locals.webpack_dist_dir = 'dist';
    }
    return next();
  });

  // Use webpack dev middleware for reloads.
  if (app.get('env') === 'development' && process.env.CONTEXT !== 'test' && config.locals.use_element_devtool) {
    const configurations = config.webpackConfig || webpackConfig;
    // Have to support any of these types of configurations:
    // 1. an object
    // 2. an array of objects
    // 3. a promise that resolves to either of the above options
    Promise
      .resolve(configurations)
      .then((resolvedConfigurations) => {
        _.castArray(resolvedConfigurations).forEach((originalConfiguration) => {
          const configuration = originalConfiguration;
          configuration.plugins = configuration.plugins.concat([
            new webpack.ProgressPlugin((percent) => {
              globalWebpackPercent = percent;
            }),
          ]);
          configuration.output.publicPath = '/webpack-dist/';
          const compiler = webpack(configuration);
          const options = {}; // webpack-hot-client options

          hotClient(compiler, options);

          app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: configuration.output.publicPath,
            stats: {
              colors: true,
            },
          }));
        });
      })
      .catch((err) => { throw err; });

    app.get('/__webpack-percent', (req, res) => res.json(globalWebpackPercent));
    app.use((req, res, next) => {
      if (globalWebpackPercent < 1) {
        return res.render('pages/utils/loading', {
          percent: globalWebpackPercent,
          layout: false,
        });
      }
      return next();
    });
  }
}
