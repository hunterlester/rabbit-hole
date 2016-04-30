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
    devtool: 'sourcemap',
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
    devtool: 'cheap-module-source-map',
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './client/index.jsx'
    ],
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
        }
      ]
    },
    resolve: {
      alias: {
        'react': path.join(__dirname, 'node_modules', 'react')
      },
      extensions: ['', '.js', '.jsx']
    },
    output: {
      path: __dirname + '/server/public',
      publicPath: '/',
      filename: 'webpack_bundle.js'
    },
    devServer: {
      contentBase: './dev_entry',
      hot: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  }
];
