/**
 * @module api/user 用户
 */
const router = require('koa-router')()
const checkLogin = require('../../utils/checkLogin')
const { success, error } = require('../../utils')
const server = require('../../servers/api/user')

router.prefix('/api/user')

router.post('/login', async (ctx) => {
  const { body } = ctx.request
  const { username, password } = body
  const res = await server.login({ username, password })
  if (res.flag) {
    ctx.session.user_id = res.id
  }
  ctx.response.body = res.result
})

router.get('/logout', async (ctx) => {
  ctx.session.user_id = null
  ctx.response.body = await server.logout()
})

router.use(checkLogin())

router.get('/info', async (ctx) => {
  const { user_id = '' } = ctx.session
  ctx.response.body = await server.info({ id: user_id })
})

module.exports = router