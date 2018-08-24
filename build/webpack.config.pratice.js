const path = require('path') // node 里面的基本包，处理路径
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new VueLoaderPlugin(),
  new Webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]
const devServer = {
  port: 8003,
  host: '0.0.0.0', // 设置成 ip, 别的电脑也可访问
  overlay: {
    errors: true
  },
  hot: true
}
let config

if (isDev) {
  config = merge(baseConfig, {
    entry: path.join(__dirname, '../pratice/index.js'),
    module: {
      rules: [{
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    devtool: '#cheap-module-eval-source-map',
    devServer,
    // import Vue from 'vue'
    resolve: {
      alias: {
        'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
      }
    },
    plugins: defaultPlugins.concat([
      new Webpack.HotModuleReplacementPlugin()
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../pratice/index.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [{
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'stylus-loader'
          }
        ]
      }]
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css'
      })
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      },
      runtimeChunk: true
    }
  });
}

module.exports = config
