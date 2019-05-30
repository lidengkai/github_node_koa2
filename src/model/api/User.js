/**
 * 
 */
const Sequelize = require('sequelize')

module.exports = {
  key: 'nodeUser',
  name: '用户表',
  columns: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING(32),
      unique: true
    },
    password: {
      type: Sequelize.STRING(128)
    },
    role: {
      type: Sequelize.INTEGER
    }
  }
}