/*eslint-disable func-names */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractText = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

const webpackConfig = require('./webpack.config');
const NPMPackage = require('./../package');

const config = merge.smart(webpackConfig, {
  entry: {
    'scripts/app': './scripts/index.jsx',
    'scripts/modernizr': './scripts/vendor/modernizr-custom.js',
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
  },
  devtool: 'source-map',
  plugins: [
    new CleanPlugin(['dist'], { root: path.join(__dirname, '../') }),
    new CopyPlugin([
      { from: '.htaccess' },
      { from: 'robots.txt' },
    ]),
    new ExtractText('styles/app.[hash].css'),
    new HtmlPlugin({
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      mobile: true,
      template: './index.ejs',
      title: NPMPackage.title,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new OfflinePlugin({
      autoUpdate: true,
      ServiceWorker: {
        events: true,
      },
      AppCache: {
        events: true,
      },
      cacheMaps: [
        {
          match: function() { //eslint-disable-line object-shorthand
            return new URL('/', location);
          },
          requestTypes: ['navigate'],
        },
      ],
    }),
  ],
});

module.exports = config;
