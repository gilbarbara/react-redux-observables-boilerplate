/*eslint-disable no-var, func-names, prefer-arrow-callback, object-shorthand, no-console, prefer-template, vars-on-top */
var merge = require('webpack-merge');
var HtmlPlugin = require('html-webpack-plugin');

var NPMPackage = require('./../package');
var webpackConfig = require('./webpack.prod');

var config = merge.smart(webpackConfig, {
  output: {
    publicPath: '/react-redux-observables-boilerplate/'
  },
  plugins: [
    new HtmlPlugin({
      appMountId: 'react',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      mobile: true,
      template: './index.ejs',
      title: NPMPackage.title,
      baseHref: '/react-redux-observables-boilerplate'
    })
  ]
});

module.exports = config;
