module.exports = {
  // session配置
  sessionKeys: ['koa2'],
  session: {
    key: 'koa:sess',
    maxAge: 2 * 60 * 60 * 1000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false
  }
}