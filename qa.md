## webpack4 升级

webpack4 变化
* 版本变化：loader、plugin 升级
* 配置变化：增加 module 配置项、

### webpack4 配置 Vue 遇到的问题

1. 需要安装依赖 webpack-cli 或者 webpack-command
	```
	npm i webpack-cli
	```

2. 在执行脚本的时候需要声明 `mode` ，指定生产环境还是开发环境
	```
	"build": "webpack --mode=production --config webpack.config.js"
	```

3. You may need an appropriate loader to handle this file type.<br /> 
	需要配置 loader 
	
 	```
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
            }
        ]
    }
 	```
 
4. webpack4 配置需要包含 `VueLoaderPlugin `
 	
 	```
 	const VueLoaderPlugin = require('vue-loader/lib/plugin');
 	```
 	
 	然后配置 plugins
 	
 	```
 	plugins: [
        new VueLoaderPlugin()
    ]
 	```
 	
5. 在 css 分离代码过程中，extract-text-webpack-plugin 与 webpack4 不兼容，换成 `mini-css-extract-plugin` [官网指南](https://www.npmjs.com/package/mini-css-extract-plugin)。 或者 <br /><br />
使用 extract-text-webpack-plugin 4.0-beat版本

	```
	npm i extract-text-webpack-plugin@next --save-dev
	```
然后

	```
	config.plugins.push(
	    // new ExtractTextPlugin("styles.[ontentHash:8].css")
	    new ExtractTextPlugin('styles.[hash:8].css')
	)
	```

6. 类库代码分离时 Error: webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead <br />
	[推荐阅读](https://blog.csdn.net/songluyi/article/details/79419118)
	> 默认模式会将所有来自node_modules的模块分配到一个叫vendors的缓存组；所有重复引用至少两次的代码，会被分配到default的缓存组。

	> 一个模块可以被分配到多个缓存组，优化策略会将模块分配至跟高优先级别（priority）的缓存组，或者会分配至可以形成更大体积代码块的组里。
	
	> 通过optimization.runtimeChunk: true选项，webpack会添加一个只包含运行时(runtime)额外代码块到每一个入口。
