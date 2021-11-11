const handleBlogRoute = (req,res) => {
  const method = req.method

  // 获取博客列表
  if(method === "GET" && req.path === '/api/blog/list'){
    return{
      msg:"获取博客列表"
    }
  }

  // 获取一篇博客接口
  if(method === "GET" && req.path === '/api/blog/detail'){
    return {
      msg:"获取一篇博客接口"
    }
  }

  // 新增一篇博客
  if(method === "POST" && req.path === '/api/blog/new'){
    return {
      msg:"新增一篇博客"
    }
  }

  // 更新一篇博客
  if(method === "POST" && req.path === '/api/blog/update'){
    return {
      msg:"更新一篇博客"
    }
  }

  // 删除一篇博客
  if(method === 'POST' && req.path === '/api/blog/del'){
    return {
      msg:'删除一篇博客'
    }
  }
}

module.exports = handleBlogRoute