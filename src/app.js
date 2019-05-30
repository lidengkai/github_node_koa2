const koa = require('koa')
const static = require('koa-static')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const json = require('koa-json')
const onerror = require('koa-onerror')
const session = require('koa-session')
const config = require('./config')
const { rootPath, requirePaths } = require('./utils')
const { getFiles } = require('./utils/file')
const { initModels } = require('./utils/sql')

module.exports = async () => {
  const app = new koa()

  // error handler
  onerror(app)

  app.use(bodyparser())
  app.use(json())
  app.use(logger())

  if (config.STATIC) {
    app.use(static(config.STATIC))
  }

  app.use(static(rootPath('/public')))

  app.keys = config.sessionKeys
  app.use(session(config.session, app))

  // init sequelize
  const modelPaths = await getFiles(rootPath('/src/model'))
  const modelConfigs = requirePaths(modelPaths)
  config.models.set(initModels(modelConfigs))

  // init route
  const routePaths = await getFiles(rootPath('/src/routes'))
  const routeConfigs = requirePaths(routePaths)
  for (let i = 0, l = routeConfigs.length; i < l; i++) {
    app.use(routeConfigs[i].routes())
  }

  // 404
  app.use(async (ctx) => {
    ctx.response.status = 404
  })

  // error-handling
  app.on('error', (err, ctx) => {
    console.error('[server error:]', err)
  })

  return app
}
