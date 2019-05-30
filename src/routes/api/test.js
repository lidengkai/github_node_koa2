/**
 * @module api/test 测试
 */
const router = require('koa-router')()
const checkLogin = require('../../utils/checkLogin')
const server = require('../../servers/api/test')

router.prefix('/api/test')

router.use(checkLogin())

router.post('/', async (ctx) => {
  const { body } = ctx.request
  ctx.response.body = await server.add(body)
})

router.get('/:id', async (ctx) => {
  const { id } = ctx.params
  ctx.response.body = await server.get({ id })
})

router.put('/:id', async (ctx) => {
  const { body } = ctx.request
  const { id } = ctx.params
  ctx.response.body = await server.set({ ...body, id })
})

router.delete('/:id', async (ctx) => {
  const { id } = ctx.params
  ctx.response.body = await server.delete({ id })
})

router.post('/:page/:size', async (ctx) => {
  const { body } = ctx.request
  const { page, size } = ctx.params
  ctx.response.body = await server.list({ ...body, page, size })
})

module.exports = router