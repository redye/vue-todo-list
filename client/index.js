import Vue from 'vue' // 引入类库
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import createRouter from './config/router'
import createStore from './store/store'

import './assets/styles/global.styl'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
router.beforeEach((to, from, next) => {
  console.log(`beforeEach => ${to.params ? JSON.stringify(to.params) : ''}`)
  next()
})

router.beforeResolve((to, from, next) => {
  console.log(`beforeResolve => ${to.params ? JSON.stringify(to.params) : ''}`)
  next()
})

router.afterEach((to, from) => {
  console.log(`afterEach => ${to.params ? JSON.stringify(to.params) : ''}`)
})

const store = createStore()
store.registerModule('c', {
  state: {
    text: 3
  }
})
// store.unregisterModule('c') // 解绑

// 第二个参数是在第一个参数有返回值时才会发生，第一个参数是一个方法
store.watch((state) => state.count + 1, (newCount) => {
  console.log(`newCount => ${newCount}`)
})

Vue.config.devtools = true

const root = document.createElement('div')
document.body.appendChild(root)

// .vue 文件是个组件，不能直接挂载到浏览器，
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)
