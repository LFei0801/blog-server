/**
 * 用户登录时 检验用户名和密码
 * @param username
 * @param password
 * @returns {boolean}
 */
const loginCheck = (username,password) => {
    return username === "admin" && password === "123"
}

module.exports = {
    loginCheck
}