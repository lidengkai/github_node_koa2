const router = require('koa-router')()
const { rootPath } = require('../utils')
const { doExec } = require('../utils/exec')
const { PRODUCTION, TESTING, DEVELOPMENT, ENV } = require('../config')

// 本地开发禁用
if (ENV === PRODUCTION || ENV === TESTING || ENV === DEVELOPMENT) {
  router.all('/routes/webhook', async (ctx) => {
    const filePath = rootPath('/src/pull.sh')
    const res = await doExec(`sh ${filePath}`)
    const { message } = res
    ctx.response.body = message.trim()
  })
}

module.exports = router
