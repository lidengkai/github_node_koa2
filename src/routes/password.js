const router = require('koa-router')()
const { PRODUCTION, TESTING, DEVELOPMENT, ENV, PWD_SECRET } = require('../config')
const { trim } = require('../utils')
const { encode } = require('../utils/password')

// 本地开发启用
if (ENV !== PRODUCTION && ENV !== TESTING && ENV !== DEVELOPMENT) {
  router.all('/routes/password', async (ctx) => {
    const { query } = ctx.request
    const str = trim(Object.keys(query)[0])
    ctx.response.body = str && encode(str, PWD_SECRET)
  })
}

module.exports = router
