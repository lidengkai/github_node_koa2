const { sequelize } = require('../config')

module.exports.linkDatabase = () => {
  sequelize.authenticate().then(() => {
    console.log('数据库连接成功')
    return true
  }).catch(err => {
    console.error('数据库连接失败', err && err.original && err.original.sqlMessage || '')
    return false
  })
}

// 转换驼峰命名
const turnCamelCase = (str) => {
  if (typeof str === 'string') {
    return str.trim().replace(/([A-Z])/g, '_$1').toLowerCase()
  }
  return ''
}

module.exports.turnCamelCase = turnCamelCase

// 初始化models
module.exports.initModels = (configs) => {
  const models = {}
  for (let i = 0, l = configs.length; i < l; i++) {
    try {
      const { key, columns } = configs[i]
      models[key] = sequelize.define(turnCamelCase(key), columns, {
        freezeTableName: true,
        timestamps: false
      })
    } catch (err) {
      console.error(`创建model失败：${err}`)
    }
  }
  for (let i = 0, l = configs.length; i < l; i++) {
    try {
      const { key, associations } = configs[i]
      if (typeof associations === 'function') {
        associations.call(models[key], models)
      }
    } catch (err) {
      console.error(`关联model失败：${err}`)
    }
  }
  return models
}

// 开启事务
module.exports.transaction = (callback) => {
  return new Promise(resolve => {
    sequelize.transaction(async t => {
      if (typeof callback === 'function') {
        return await callback({ transaction: t })
      }
    }).then(function (data) {
      resolve({ flag: true, data })
    }).catch(function (err) {
      const message = err && err.original && err.original.sqlMessage || ''
      resolve({ flag: false, message })
    })
  })
}

// 普通sql
module.exports.sql = (sql, replacements) => {
  return new Promise(resolve => {
    sequelize.query(sql + ';',
      {
        replacements
      }
    ).then(data => {
      resolve({ flag: true, data })
    }).catch(err => {
      const msg = err && err.original && err.original.sqlMessage || ''
      console.error('sql:', msg)
      resolve({ flag: false, msg })
    })
  })
}
