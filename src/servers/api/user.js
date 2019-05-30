/**
 * @module user 用户
 */
const { transaction } = require('../../utils/sql')
const { success, error } = require('../../utils')
const userDao = require('../../dao/api/user')

module.exports = {
  async login({ username, password }) {
    const res = await transaction(async (opt) => {
      return await userDao.login({ username, password }, opt)
    })
    if (res.flag && res.data) {
      return {
        flag: true,
        result: success(res.data),
        id: res.data.id
      }
    } else {
      return {
        flag: false,
        result: error('用户名或密码错误')
      }
    }
  },
  async logout() {
    return success()
  },
  async info({ id }) {
    const res = await transaction(async (opt) => {
      return await userDao.get({ id }, opt)
    })
    if (res.flag) {
      return success(res.data)
    } else {
      return error(res.message)
    }
  }
}