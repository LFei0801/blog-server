const handleBlogRoute = require('./router/blog')
const handleUserRoute = require('./router/user')

const serverHandle = (req,res)=>{
  res.setHeader('Content-Type','application/json')
  const url = req.url
  req.path = url.split("?")[0]

  const blogData = handleBlogRoute(req,res)
  if(blogData){
    res.end(JSON.stringify(blogData))
    return
  }

  const userData = handleUserRoute(req,res)
  if(userData){
    res.end(JSON.stringify(userData))
    return;
  }

  // 未命中路由，返回404
  res.writeHead(404,{"Content-Type":"text/plain"})
  res.write('404 Not Found')
  res.end()
}


module.exports = serverHandle