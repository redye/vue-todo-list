const Router = require('koa-router')
const Axios = require('axios')
const MemoryFS = require('memory-fs') // 与 FS 的区别：不把文件写到磁盘
const Webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const Path = require('path')
const fs = require('fs')

// node 里面还不支持 import，在前端通过 babel 处理

const serverRender = require('./server.render')
const serverConfig = require('../../build/webpack.config.server')

// 1、编译 webpack
const serverCompiler = Webpack(serverConfig)
// 2. 指定输出
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs
// 3. 生成一个 bundle
let bundle
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => {
    console.log(`err => ${err}`)
  })
  stats.warnings.forEach(warn => console.log(`warn => ${warn}`))

  const bundlePath = Path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log(`new bundle generated`)
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '请等一会，别着急......'
    return
  }

  const clientManifestResp = await Axios.get(
    'http://0.0.0.0:8003/public/vue-ssr-client-manifest.json'
  ) // 通过一个请求拿到 client 端的 js 文件
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(Path.join(__dirname, '../server.template.ejs'), 'utf-8')
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
