/**
 * http请求的常见处理方式
 */

const http = require("http")
const qs = require("querystring")
const port = 3000

// Promise封装获取postData数据
const getPostAsync = (req) => {
  return new Promise((resolve => {
    if(req.method !== "POST" || req.headers['content-type'] !== 'application/json'){
      resolve({})
    }
    let postData = ''
    req.on('data',chunk => postData += chunk.toString())
    req.on('end',()=>{
      if(!postData) resolve({})
      resolve(JSON.parse(postData))
    })
  }))
}

// 解析cookie
const parseCookie = (req) => {
  req.cookie = {}
  // k1=v1;k2=v2 ... 这种形式
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(";").forEach(item=>{
    if(!item) return
    // k1=v1 这种字符串拆分成 [k1,v1]
    const [key,value] = item.split("=")
    req.cookie[key] = value
  })
}

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
  // 解析cookie
  parseCookie(req)
  console.log('cookie is ',req.cookie)
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