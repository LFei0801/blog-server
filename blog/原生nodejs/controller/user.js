const { exec } = require('../db/mysql')

/**
 * 用户登录时 检验用户名和密码
 * @param username
 * @param password
 * @returns {Promise<?>}
 */
const login = (username,password) => {
    const sql = `select * from users where username='${username}' and password='${password}'`
    return exec(sql).then(rows => rows[0] || {})
}

module.exports = {
    login
}