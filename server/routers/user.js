const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async (ctx) => {
  const user = ctx.request.body
  if (user.username === 'redye' && user.password === 'redye777') {
    ctx.session.user = {
      username: 'redye'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'redye'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
