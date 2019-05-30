/**
 * @module data
 */
module.exports.filterData = (info = {}, keys) => {
  const data = {}
  for (const key of keys) {
    if (info.hasOwnProperty(key)) {
      const value = info[key]
      data[key] = value
    }
  }
  return data
}