const path = require('path') // node 里面的基本包，处理路径
const Webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const baseConfig = require('./webpack.config.base')

let config

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../client/server.entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [{
      test: /\.styl(us)?$/,
      use: ExtractTextPlugin.extract({
        fallback: 'vue-style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }]
  },
  // import Vue from 'vue'
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.[hash:8].css',
      allChunks: true
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env_VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config
