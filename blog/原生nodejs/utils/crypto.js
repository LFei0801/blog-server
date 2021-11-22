const crypto = require('crypto')

// 密钥
const key = `PRIVATE_KEY_USER`

// md5加密
function md5(content){
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 生成加密后的密码
function genPassword(password){
  const str = `${key}_${password}`
  return md5(str)
}

module.exports = {
  genPassword
}