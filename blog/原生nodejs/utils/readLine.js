/**
 * 分析日志--- 分析Chrome访问占比
 */

const fs = require('fs')
const path = require('path')
const readLine = require('readline')

const filename = path.resolve(__dirname,'../','logs','access.log')
const readStream = fs.createReadStream(filename)

// 创建readline对象
const readline = readLine.createInterface({
  input:readStream
})

let chromeNum = 0
let sum = 0

// 读取文件
readline.on('line',data=>{
  if(!data){
    return
  }
  // 总行数 + 1
  sum ++
  const arr = data.split('--')
  if(arr[2] && arr[2].indexOf('Chrome') !== -1){
    chromeNum ++
  }
})

// 读取完毕时
readline.on('close',()=>{
  console.log(`chrom浏览器访问占比: ${chromeNum / sum}`)
})
