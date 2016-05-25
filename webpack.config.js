var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = [
  {
    devtool: 'eval',
    target: 'node',
    node: {
      __dirname: true
    },
    entry: [
      './server/index.js'
    ],
    query: {
      cacheDirectory: true,
      presets: ['es2015']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['', '.js']
    },
    output: {
      path: __dirname + "/build",
      publicPath: '/',
      filename: 'server_bundle.js'
    },
    externals: nodeModules,
    plugins: [
      new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false })
    ]
  },
  {
    target: 'web',
    devtool: 'eval',
    entry: [
      'webpack-hot-middleware/client',
      './client/index.jsx'
    ],
    query: {
      cacheDirectory: true,
    },
    target: 'web',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'react-hot!babel'
        },
        {
          test: /\.css$/,
          loader: 'style!css!autoprefixer'
        },
        { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.ttf$/,    loader: "file-loader" },
        { test: /\.eot$/,    loader: "file-loader" },
        { test: /\.svg$/,    loader: "file-loader" }
      ]
    },
    resolve: {
      alias: {
        'react': path.join(__dirname, 'node_modules', 'react')
      },
      extensions: ['', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/server/public/',
      publicPath: '/',
      filename: 'webpack_bundle.js'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
          //change to 'production' in production
        }
      })
    ]
  }
];
