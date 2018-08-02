const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
        autoprefixer()
    ]
}

// postcss 优化 css 代码
// 通过一系列的插件优化
// Autoprefixer解析CSS文件并且添加浏览器前缀到CSS规则里，使用Can I Use的数据来决定哪些前缀是需要的