const router = require('koa-router')()
const { PRODUCTION, TESTING, DEVELOPMENT, ENV } = require('../config')
const { rootPath, requirePaths } = require('../utils')
const { getFiles, writeFile } = require('../utils/file')
const { turnCamelCase } = require('../utils/sql')
const Sequelize = require('sequelize')

const tablePath = rootPath('tables.sql')


const readType = (type) => {
  const val = type && type.options ? type.options.length : 0
  if (type instanceof Sequelize.INTEGER) {
    return 'INTEGER' + (val ? `(${val})` : '')
  } else if (type instanceof Sequelize.STRING) {
    return 'VARCHAR' + (val ? `(${val})` : '(255)')
  } else if (type instanceof Sequelize.TEXT) {
    return 'TEXT'
  }
  return false
}

const readInfo = (info) => {
  const { allowNull, defaultValue, unique, autoIncrement } = info
  let str = ''
  if (allowNull === true) {
    str += ' NULL'
  } else if (allowNull === false) {
    str += ' NOT NULL'
  }
  if (typeof defaultValue === 'string') {
    str += ' DEFAULT `' + defaultValue + '`'
  } else if (typeof defaultValue === 'number') {
    str += ' DEFAULT ' + defaultValue
  }
  if (unique) {
    str += ' UNIQUE'
  }
  if (autoIncrement) {
    str += ' AUTO_INCREMENT'
  }
  return str
}

const readColums = (columns) => {
  let str = ''
  let primaryKey = ''
  for (const key in columns) {
    const col = columns[key]
    const type = readType(col.type)
    if (type) {
      const info = readInfo(col)
      if (col.primaryKey) {
        primaryKey = key
      }
      str += `  \`${key}\` ${type}${info},\n`
    }
  }
  str += '  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n'
  str += '  `update_time` TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP'
  if (primaryKey) {
    str += ',\n'
    str += `  PRIMARY KEY (\`${primaryKey}\`)\n`
  } else {
    str += '\n'
  }
  return str
}

// 本地开发启用
if (ENV !== PRODUCTION && ENV !== TESTING && ENV !== DEVELOPMENT) {
  router.all('/routes/table', async (ctx) => {
    const modelPaths = await getFiles(rootPath('/src/model'))
    const modelConfigs = requirePaths(modelPaths)
    let str = ''
    str += `\n\n`
    str += `-- 选择数据库\n`
    str += `use node;\n`
    str += `\n`
    str += `-- ALTER TABLE [:name] ADD/CHANGE COLUMN [:oldCol?] :newCol :colType;\n`
    str += `\n`
    for (const config of modelConfigs) {
      const { name: alias, key, columns } = config
      const name = turnCamelCase(key)
      str += `-- ${alias}\n`
      str += `CREATE TABLE IF NOT EXISTS \`${name}\` (\n`
      str += readColums(columns)
      str += `) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n`
      str += `\n`
    }
    ctx.response.body = await writeFile(tablePath, str)
  })
}

module.exports = router
