const { exec, escape} = require('../db/mysql')
const {genPassword} = require('../utils/crypto')

/**
 * 用户登录时 检验用户名和密码
 * @param username
 * @param password
 * @returns {Promise<?>}
 */
const login = (username,password) => {
    username = escape(username)
    // 加密
    password = genPassword(password)
    // 防止sql注入
    password = escape(password)
    const sql = `select * from users where username=${username} and password=${password}`
    return exec(sql).then(rows => rows[0] || {})
}

module.exports = {
    login
}