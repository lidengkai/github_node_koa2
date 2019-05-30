/**
 * @module Test
 */
const { models } = require('../../config')
const Sequelize = require('sequelize')
const { Op, fn, col, literal } = Sequelize

module.exports = {
  async add({ id, ...info }, opt) {
    const { nodeTest } = models.get()
    return await nodeTest.create(info, opt)
  },
  async set({ id, ...info }, opt) {
    const { nodeTest } = models.get()
    return await nodeTest.update(info, { where: { id }, ...opt })
  },
  async get({ id }, opt) {
    const { nodeTest } = models.get()
    return await nodeTest.findOne({ where: { id } }, opt)
  },
  async delete({ id }, opt) {
    const { nodeTest } = models.get()
    return await nodeTest.destroy({ where: { id } }, opt)
  },
  async list({ page = 1, size = 10, name, status, order, sort }, opt) {
    const { nodeTest } = models.get()
    const where = {}
    if (name) {
      where.name = {
        [Op.like]: `%${name}%`
      }
    }
    if (status) {
      where.status = {
        [Op.in]: [].concat(status)
      }
    }
    const currentOrder = []
    if (sort && order) {
      currentOrder.push([sort, order])
    }
    return await nodeTest.findAndCountAll({
      where,
      order: currentOrder,
      offset: (page - 1) * size,
      limit: +size
    }, opt)
  }
}