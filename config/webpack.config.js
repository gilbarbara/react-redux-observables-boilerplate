/*eslint-disable no-var, one-var, func-names, indent, prefer-arrow-callback, object-shorthand, no-console, newline-per-chained-call, one-var-declaration-per-line, prefer-template, vars-on-top */
const path = require('path');
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const NPMPackage = require('./../package');

const isProd = process.env.NODE_ENV === 'production';
const cssLoaders = [
  'style',
  'css?sourceMap',
  {
    loader: 'postcss',
    options: {
      sourceMap: true,
      plugins: [
        autoprefixer({
          browsers: NPMPackage.browserslist,
        }),
      ],
    },
  },
  'sass?sourceMap',
];

const config = {
  context: path.join(__dirname, '../app'),
  resolve: {
    alias: {
      modernizr$: path.join(__dirname, '.modernizrrc'),
      assets: path.join(__dirname, '../assets'),
    },
    modules: [path.join(__dirname, '../app', 'scripts'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  entry: {},
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
  },
  devtool: '#inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel?cacheDirectory'],
        include: [
          path.join(__dirname, '../app', 'scripts'),
        ],
      },
      {
        test: /\.scss$/,
        loader: isProd ? ExtractText.extract({
          use: cssLoaders.slice(1),
        }) : cssLoaders,
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['url?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]'],
        include: /fonts/,
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file?name=fonts/[name].[ext]'],
        include: /fonts/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: [
          'file?hash=sha512&digest=hex' + (isProd ? '&name=media/[name].[ext]' : ''),
          {
            loader: 'image-webpack',
            query: {
              optipng: {
                optimizationLevel: 5,
              },
              pngquant: {
                quality: '75-90',
              },
            },
          },
        ],
        include: /media/,
      },
      {
        test: /\.json$/,
        use: ['json'],
      },
      {
        test: /\.modernizrrc$/,
        use: ['expose?Modernizr', 'modernizr', 'json'],
      },
      {
        test: /\.md$/,
        use: ['html', 'markdown'],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.APP_ENV': JSON.stringify(process.env.APP_ENV),
      'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
      VERSION: JSON.stringify(NPMPackage.version),
    }),
  ],
};

module.exports = config;
