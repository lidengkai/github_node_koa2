/**
 * @module wechat 微信小程序相关
 */
const crypto = require('crypto')
const request = require('./request')

// 小程序解密
module.exports.wechatDecrypt = (sid, encryptedData, iv) => {
  try {
    const theSessionKey = new Buffer(sid, 'base64')
    const theEncryptedData = new Buffer(encryptedData, 'base64')
    const theIv = new Buffer(iv, 'base64')
    // 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', theSessionKey, theIv)
    // 设置自动padding为true，删除填充补位
    decipher.setAutoPadding(true)
    const decoded = decipher.update(theEncryptedData, 'binary', 'utf8') + decipher.final('utf8')
    return JSON.parse(decoded)
  } catch (err) {
    console.error('[wechat decrypt:]', '解密失败', err)
    return false
  }
}

// 微信登录
module.exports.wechatLogin = async (code) => {
  const res = await request({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    method: 'get',
    params: {
      appid: '',
      secret: '',
      js_code: code,
      grant_type: 'authorization_code'
    }
  })
  console.log('[wechat login]:', res)
  if (res) {
    const { session_key } = res
    if (session_key) {
      return session_key
    }
  }
  return false
}
