const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

// 配置
const con =  mysql.createConnection(MYSQL_CONFIG)

// 开始连接
con.connect()

/***
 * 执行sql语句 返回promise对象
 * @param sql
 * @returns {Promise<unknown>}
 */
function exec(sql){
  return new Promise((resolve,reject) => {
    con.query(sql,(err,result)=>{
      if(err){
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec
}