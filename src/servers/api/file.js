/**
 * @module file 文件上传
 */
const { success, error } = require('../../utils')
const { saveFile } = require('../../utils/file')

module.exports = {
  async upload({ file }) {
    const res = await saveFile(file)
    if (res) {
      return success(res)
    }
    return error('文件上传失败')
  }
}