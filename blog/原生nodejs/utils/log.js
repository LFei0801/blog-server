/**
 * 记录日志
 */
const fs = require('fs')
const path = require('path')
const env = process.env.NODE_ENV // 环境参数

// 生成writeStream
function createWriteStream(filename){
  // ./../logs/filename
  const fullFileName = path.resolve(__dirname,'../','logs',filename)
  return fs.createWriteStream(fullFileName,{
    flags:'a'
  })
}

// 写入日志方法
function writeLog(writeStream,log){
  writeStream.write(log+'\n')
}

/**
 * 访问日志方法
 * @param logs 字符串,写入的内容
 */
const accessWriteStream = createWriteStream('access.log')
const assess = (logs) => {
  // 开发环境时,直接输出日志
  if(env === "dev"){
    console.log(logs)
    return
  }
  writeLog(accessWriteStream,logs)
}

module.exports = {
  assess
}
