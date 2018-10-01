const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const cwd = process.cwd();

module.exports = {
  stats: {
    colors: true,
  },
  cache: true,
  entry: {
    main: path.join(cwd, 'public/src/main.js'),
    style: path.join(cwd, 'public/scss/main.scss'),
    styleguide: path.join(cwd, 'public/scss/styleguide.scss'),
  },
  output: {
    path: path.join(cwd, 'public/dist/'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name]-[id].js',
  },
  resolve: {
    alias: {
      public: path.join(cwd, 'public'),
      shared: path.join(cwd, 'shared'),
      brandPublic: path.join(cwd, 'public'),
      brandShared: path.join(cwd, 'shared'),
      handlebars: 'handlebars/runtime.js',
    },
    extensions: ['.js', '.coffee'],
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        use: 'coffee-loader',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        include: path.join(cwd, 'public'),
        use: 'url-loader?limit=30000&name=images/[name].[ext]',
      },
      {
        test: /\.js$/,
        exclude: /node_modules(?!\/element)/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', { modules: false }],
          ],
        },
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
        query: {
          exclude: 'node_modules',
          partialResolver: (partial, callback) => {
            const partialPath = `${path.join(cwd, 'shared', 'partials/')}${partial}.hbs`;
            const componentPath = `${path.join(cwd, 'shared', 'components/')}${partial}.hbs`;
            fs.stat(partialPath, (err, stat) => {
              if (err === null && stat) {
                callback(null, partialPath);
              } else {
                callback(null, componentPath);
              }
            });
          },
          helperResolver: (helper, callback) => {
            const helperPath = `${path.join(cwd, 'shared', 'helpers/')}${helper.replace('./', '')}.js`;
            fs.stat(helperPath, (err, stat) => {
              if (err === null && stat) {
                callback(null, helperPath);
              } else {
                callback();
              }
            });
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new LodashModuleReplacementPlugin({
      paths: true,
      caching: true,
      cloning: true,
    }),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
  ],
  node: {
    fs: 'empty',
  },
};
