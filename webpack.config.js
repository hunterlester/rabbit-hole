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

// Development instructions
// 'devtool == eval' in development
// ONLY FOR target = 'web'
// uncomment webpack-hot-middleware/client in entry
// add 'react-hot!' to loader where test = jsx
// uncomment new webpack.HotModuleReplacementPlugin in plugins

// FOR PRODUCTION
// devtool : 'cheap-module-source-map'

module.exports = [
  {
    devtool: 'cheap-module-source-map',
    target: 'node',
    node: {
      __dirname: true
    },
    entry: [
      './server/index.js'
    ],
    query: {
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
    devtool: 'cheap-module-source-map',
    entry: [
      // 'webpack-hot-middleware/client',
      './client/index.jsx'
    ],
    target: 'web',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel'
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
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin()
    ]
  }
];
