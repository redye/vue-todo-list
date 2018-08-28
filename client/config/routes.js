// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  }, {
    // path: '/app/:id',
    path: '/app',
    props: true,
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    // component: Todo,
    component: () => import(/* webpackChunkName: "todo-view" */ '../views/todo/todo.vue'), // 路由异步加载
    name: 'App'
    // beforeEnter: (to, from, next) => {
    //   console.log(`beforeEnter ==> ${to.params.id}`)
    //   next()
    // }
  }, {
    path: '/login',
    // component: Login,
    component: () => import(/* webpackChunkName: "login-view" */ '../views/login/login.vue'),
    name: 'Login'
  }
]
