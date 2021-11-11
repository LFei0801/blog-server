/**
 * http请求的常见处理方式
 */

const http = require("http")
const qs = require("querystring")
const port = 3000

http.createServer((req,res)=>{
  const url = req.url
  const method = req.method
  const [path,query] = url.split("?")
  // 设置响应数据格式
  res.setHeader("Content-Type","application/json")
  // 设置响应数据属性
  const retData = {
    url,
    method,
    path,
    query:qs.parse(query)
  }
  // 根据请求设置不同的响应方法
  if(method === "GET"){
    res.end(JSON.stringify(retData))
  }else if(method === "POST"){
    let postData = ''
    req.on('data',chunk => postData += chunk.toString())
    req.on('end',()=>{
      retData.postData = postData
      res.end(JSON.stringify(retData))
    })
  }

}).listen(port)

console.log("server is running at 3000")