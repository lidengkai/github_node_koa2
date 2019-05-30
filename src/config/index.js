const Sequelize = require('sequelize')
const config = require('../../config')
const { mysql } = config

const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
  host: mysql.host,
  port: mysql.port,
  dialect: 'mysql',
  pool: {
    max: mysql.connectionLimit,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const modelsHandle = () => {
  const models = {}
  return {
    set: (opts) => {
      Object.assign(models, opts)
    },
    get: () => {
      return models
    }
  }
}

module.exports = {
  ...config,
  PWD_SECRET: 'node#key',
  sequelize,
  models: modelsHandle()
}