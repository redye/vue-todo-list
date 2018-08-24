module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 去除空格
    extractCSS: !isDev, // css 单独打包
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hase:base64:5]',
      camelCase: true,
    },
    // hotReload: false, // 根据环境变量生成
  }
}
