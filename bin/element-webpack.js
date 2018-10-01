#!/usr/bin/env node

const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

// const [,, ...args] = process.argv;

console.log('hello!');
console.log(webpackConfig);

// const compiler = webpack(webpackConfig);
// compiler.run((err, stats) => {});
webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(JSON.stringify(err.details, null, 2));
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(JSON.stringify(info.errors, null, 2));
  }

  if (stats.hasWarnings()) {
    console.warn(JSON.stringify(info.warnings, null, 2));
  }

  console.log('ALL DONE');
});
