const path = require('path') // node 里面的基本包，处理路径
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const merge = require('webpack-merge')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

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
  }),
  new VueClientPlugin()
]
const devServer = {
  port: 8003,
  host: '0.0.0.0', // 设置成 ip, 别的电脑也可访问
  overlay: {
    errors: true
  },
  headers: {'Access-Control-Allow-Origin': '*'},
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  hot: true
}
let config

if (isDev) {
  config = merge(baseConfig, {
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
    plugins: defaultPlugins.concat([
      new Webpack.HotModuleReplacementPlugin(),
      new Webpack.NoEmitOnErrorsPlugin()
    ])
  });
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client.entry.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
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
    plugins: defaultPlugins.concat([
      new ExtractTextPlugin({
        filename: 'styles.[hash:8].css',
        allChunks: true
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
  })
}

module.exports = config
