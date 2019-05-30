// 检查登录
module.exports = () => {
  return async (ctx, next) => {
    const { user_id = '' } = ctx.session
    if (user_id) {
      await next()
    } else {
      ctx.response.status = 401
    }
  }
}