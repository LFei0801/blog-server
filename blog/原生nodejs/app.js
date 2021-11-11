const handleBlogRoute = require('./router/blog')
const handleUserRoute = require('./router/user')
const qs = require('querystring')
const {getPostData} = require('./utils/index')

const serverHandle = (req,res)=>{
  res.setHeader('Content-Type','application/json')
  // 解析路径，绑定在req.path属性上
  req.path = req.url.split("?")[0]
  // 解析请求参数，绑定在req.query属性上
  req.query = qs.parse(req.url.split('?')[1])
  // 解析post请求数据
  getPostData(req).then(data => {
    // 将post请求传入的数据绑定在req.body对象属性上
    req.body = data

    // 博客路由
    const blogData = handleBlogRoute(req,res)
    if(blogData){
      res.end(JSON.stringify(blogData))
      return
    }

    // 用户路由
    const userData = handleUserRoute(req,res)
    if(userData){
      res.end(JSON.stringify(userData))
      return;
    }

    // 未命中路由，返回404
    res.writeHead(404,{"Content-Type":"text/plain"})
    res.write('404 Not Found')
    res.end()
  })
}


module.exports = serverHandle