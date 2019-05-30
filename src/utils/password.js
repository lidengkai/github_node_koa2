/**
 * @module password 密码加密
 */
const crypto = require('crypto')

module.exports = {
  // 加密
  encode(str, secret) {
    const cipher = crypto.createCipher('aes192', secret)
    let enc = cipher.update(str, 'utf8', 'hex')
    enc += cipher.final('hex')
    return enc
  },
  // 解密
  decode(str, secret) {
    const decipher = crypto.createDecipher('aes192', secret)
    let dec = decipher.update(str, 'hex', 'utf8')
    dec += decipher.final('utf8')
    return dec
  }
}