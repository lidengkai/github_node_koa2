/**
 * @module file 文件上传
 */
const router = require('koa-router')()
const checkLogin = require('../../utils/checkLogin')
const { readReqFile } = require('../../utils/file')
const server = require('../../servers/api/file')
const { lazy } = require('../../utils/time')

router.prefix('/api/file')

router.use(checkLogin())

router.post('/upload', async (ctx) => {
  const info = await readReqFile(ctx.req)
  const { fields = {}, files = {} } = info
  const file = files.file
  ctx.response.body = await server.upload({ file })
})

module.exports = router