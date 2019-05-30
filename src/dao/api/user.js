/**
 * 
 */
const Sequelize = require('sequelize')
const { models, PWD_SECRET } = require('../../config')
const { encode } = require('../../utils/password')
const { Op, fn, col, literal } = Sequelize

module.exports = {
  async login({ username, password }, opt) {
    const { nodeUser } = models.get()
    const pwd = encode(password, PWD_SECRET)
    return await nodeUser.findOne({
      attributes: {
        exclude: [
          'password'
        ]
      },
      where: {
        username,
        password: pwd
      }
    }, opt)
  },
  async get(where) {
    const { nodeUser } = models.get()
    const res = await nodeUser.findOne({
      attributes: {
        exclude: [
          'password'
        ]
      },
      where
    })
    if (res) {
      return res.dataValues
    }
    return false
  }
}