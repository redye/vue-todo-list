## 错误合集

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
 	
5. extract-text-webpack-plugin 与 webpack4 不兼容，换成 `mini-css-extract-plugin`