const http = require('http')

const server = http.createServer((req,res)=>{
  res.writeHead(200,{'Content-Type':'text/html'})
  res.end("<h1>Hello world</h1>")
})

server.listen(3000,()=>console.log("server is running on 3000 port"))


/**
 * Server 端和前端开发的区别
 *
 * 服务稳定性  ---> 单个客户端可以挂掉，服务端不能
 * 考虑内存和CPU(优化、扩展)  ---> server端要承载很多请求，CPU和内存都是稀缺资源，使用 redis 存 session
 * 日志记录  ---> 使用 stream写日志,存储日志以用来分析日志
 * 安全 ---> 要随时准备接收各种恶意攻击，比如越权操作，数据库攻击等
 * 集群和服务拆分
 */

