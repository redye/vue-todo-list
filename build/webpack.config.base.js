const path = require('path') // node 里面的基本包，处理路径

const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  entry: path.join(__dirname, '../client/client.entry.js'), // __dirname 表示当前文件所在目录，也就是根目录， join 表示拼接 
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://0.0.0.0:8003/public/'
  },
  module: {
    rules: [ // 处理规则
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      }, {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader', // 将图片转成 base64 代码
          options: {
            limit: 1024,
            name: 'resources/[path][name]-[hash:8].[ext]' // 原来的图片名称-aaa.扩展名
          }
        }]
      }
    ]
  },
}

module.exports = config
