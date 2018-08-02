const path = require('path'); // node 里面的基本包，处理路径
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.join(__dirname, 'src/index.js'),   //__dirname 表示当前文件所在目录，也就是根目录， join 表示拼接
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [  // 处理规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    'css-loader'
                ]
            }, {
                test: /\.styl$/,
                use: [
                    'style-loader', 
                    'css-loader',
                    'stylus-loader'
                ]
            }, {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader', // 将图片转成 base64 代码
                        options: {
                            limit: 1024,
                            name: '[name]-todo.[ext]', //原来的图片名称-aaa.扩展名
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}   