const env = process.env.NODE_ENV // 环境参数

let MYSQL_CONFIG
let REDIS_CONFIG

if(env === "production"){
  MYSQL_CONFIG = {
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'myblog'
  }
  REDIS_CONFIG = {
    host:"127.0.0.1",
    port:6379
  }
}

if(env === "dev"){
  MYSQL_CONFIG = {
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'myblog'
  }
  REDIS_CONFIG = {
    host:"127.0.0.1",
    port:6379
  }
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}