#!/usr/bin/env node

const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const [,, ...args] = process.argv;

// console.log('module.parent: ', module.parent);

// webpack(webpackConfig);

// console.log('require.main.filename: ', require.main.filename);

console.log(`Hello world, I am an executable script ${args}`);
