/**
 * 
 */
const Sequelize = require('sequelize')

module.exports = {
  key: 'nodeTest',
  name: '测试表',
  columns: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(32),
      unique: true,
      allowNull: true
    },
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    value: {
      type: Sequelize.INTEGER
    }
  }
}