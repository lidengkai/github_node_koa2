const path = require('path')

module.exports.trim = function (str) {
  if (str || str === 0) {
    return str.toString().trim()
  }
  return ''
}

// 随机字符串
module.exports.random = function (num, chars) {
  let str = ''
  const other = chars instanceof Array ? chars : []
  const size = 62 + other.length
  for (let i = num; i--;) {
    const n = Math.floor(Math.random() * size)
    if (n < 10) {
      str += String.fromCharCode(n + 48)// [0-9]
    } else if (n < 36) {
      str += String.fromCharCode(n + 55)// [a-z]
    } else if (n < 62) {
      str += String.fromCharCode(n + 61)// [A-Z]
    } else {
      str += other[n - 62] || ''// other
    }
  }
  return str
}

module.exports.rootPath = (pathname = '') => {
  return path.join(__dirname, '../..', './' + pathname)
}

module.exports.requirePaths = (paths) => {
  const configs = []
  const regPath = /\.js/
  if (paths instanceof Array) {
    for (let i = 0, l = paths.length; i < l; i++) {
      try {
        const path = paths[i]
        if (regPath.test(path)) {
          const config = require(path)
          if (config) {
            configs.push(config)
          }
        }
      } catch (_) {
      }
    }
  }
  return configs
}

module.exports.success = (data = null, message = '') => {
  return {
    status: 1,
    message,
    data
  }
}

module.exports.error = (message = '', data = null) => {
  return {
    status: 0,
    message,
    data
  }
}