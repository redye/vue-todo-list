import Vue from 'vue'

const app = new Vue({
  //   el: '#root',
  template: '<div ref="div">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // 在 options 写的好处：在页面注销的时候会自动注销；如果通过 $watch，可以通过 unwatch 注销 --- $watch 会将 unwatch 返回
  // watch: {
  //   text: function (newText, oldText) {
  //     console.log(` ====> ${newText} : ${oldText}`)
  //   }
  // }
})

app.$mount('#root')

// let i = 0
setInterval(() => {
  // app.text += 1
  // app.$data.text += 1
  // i++
  // app.obj.a = i
  // app.$forceUpdate()
  // 使用 $set 添加属性
  // app.$set(app.obj, 'a', i)
  // delete 删除属性
  // app.$delete(app.obj, 'a')
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer) // 服务端代码
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }
console.log(app.$root === app)
console.log(app.$children)

const unWatch = app.$watch('text', (newText, oldText) => {
  console.log(`${newText} : ${oldText}`)
})

setTimeout(() => {
  unWatch()
}, 2000)

// 事件监听
// app.$on('test', () => {
//   console.log('test emited')
// })

// app.$once('test', () => {
//   console.log('test emited')
// })

// setInterval(() => {
//   app.$emit('test')
// }, 2000)

// vue 是响应式的，未声明的变量并不会在 html 渲染，可以使用 $forceUpdate 强制渲染，蛋谨慎使用
// app.$forceUpdate()
