const redis = require('redis')
const {REDIS_CONFIG} = require("../config/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port,REDIS_CONFIG.host)
redisClient.on('error',err => console.error(err))

function set(key,val){
  redisClient.set(key,JSON.stringify(val),redis.print)
}

function get(key){
  return new Promise((resolve, reject) => {
    redisClient.get(key,(err,val)=>{
      if(err){
        reject(err)
        return
      }

      // key-value不存在时，返回null
      if(typeof val == null){
        resolve(null)
        return
      }

      // 尝试将val解析，如果不是JSON格式的数据就直接返回val
      try{
        resolve(JSON.parse(val))
      }catch (e){
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}
