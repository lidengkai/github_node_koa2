/**
 * 
 */
const { transaction } = require('../../utils/sql')
const { filterData } = require('../../utils/data')
const { success, error } = require('../../utils')
const testDao = require('../../dao/api/test')

const baseConfig = [
  'id',
  'name',
  'status',
  'value'
]

module.exports = {
  async add(data) {
    const body = filterData(data, baseConfig)
    const res = await transaction(async (opt) => {
      return await testDao.add(body, opt)
    })
    if (res.flag) {
      return success(res.data)
    } else {
      return error(res.message)
    }
  },
  async set(data) {
    const body = filterData(data, baseConfig)
    const res = await transaction(async (opt) => {
      return await testDao.set(body, opt)
    })
    if (res.flag) {
      return success(res.data)
    } else {
      return error(res.message)
    }
  },
  async get({ id }) {
    const res = await transaction(async (opt) => {
      return await testDao.get({ id }, opt)
    })
    if (res.flag) {
      return success(res.data)
    } else {
      return error(res.message)
    }
  },
  async delete({ id }) {
    const res = await transaction(async (opt) => {
      return await testDao.delete({ id }, opt)
    })
    if (res.flag) {
      return success(res.data)
    } else {
      return error(res.message)
    }
  },
  async list(data) {
    const res = await transaction(async (opt) => {
      return await testDao.list(data, opt)
    })
    if (res.flag) {
      return success(res.data)
    } else {
      return error(res.message)
    }
  }
}