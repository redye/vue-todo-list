const path = require('path') // node 里面的基本包，处理路径

const config = {
    target: 'web',
    entry: path.join(__dirname, '../client/index.js'),   //__dirname 表示当前文件所在目录，也就是根目录， join 表示拼接
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [  // 处理规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
                use: [
                    {
                        loader: 'url-loader', // 将图片转成 base64 代码
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name]-[hash:8].[ext]', //原来的图片名称-aaa.扩展名
                        }
                    }
                ]
            }
        ]
    },
}   

module.exports = config