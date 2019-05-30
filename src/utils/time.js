/**
 * @module time
 */
const moment = require('moment')

module.exports.lazy = (time) => {
  const temp = + time || 0
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, temp)
  })
}
