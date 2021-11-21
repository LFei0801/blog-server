const {SuccessModal,ErrorModal} = require('../modal/resModal')
const {
  getBlogList,
  getSingleBlog,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')

// 登录验证函数
const loginCheck = (req) => {
  if(!req.session.username){
    return Promise.resolve(new ErrorModal("尚未登录"))
  }
}

const handleBlogRoute = (req,res) => {
  const method = req.method
  const id = req.query.id

  // 获取博客列表
  if(method === "GET" && req.path === '/api/blog/list'){
    const author = req.session.username //从session处获取用户名
    const keyWord = req.query.keyword || ""
    return getBlogList(author,keyWord).then(data=>{
      return data.length ? new SuccessModal(data) : new ErrorModal("数据不存在")
    }).catch(() => new ErrorModal("server error"))
  }

  // 获取一篇博客接口
  if(method === "GET" && req.path === '/api/blog/detail'){
    return getSingleBlog(id)
      .then(data => data.id ? new SuccessModal(data): new ErrorModal("数据不存在"))
      .catch(() => new ErrorModal("server error"))
  }

  // 新增一篇博客
  if(method === "POST" && req.path === '/api/blog/new'){
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult){
      return loginCheckResult
    }
    req.body.author = req.session.username
    const blogData = req.body
    return newBlog(blogData)
      .then(id => new SuccessModal(id))
      .catch(() => new ErrorModal("server error"))
  }

  // 更新一篇博客 通过id
  if(method === "POST" && req.path === '/api/blog/update'){
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult){
      return loginCheckResult
    }
    const blogData = req.body
    return updateBlog(id,blogData)
      .then(isSuccess => isSuccess ? new SuccessModal() : new ErrorModal("更新博客失败"))
  }

  // 删除一篇博客 通过id
  if(method === 'POST' && req.path === '/api/blog/del'){
    const loginCheckResult = loginCheck(req)
    if(loginCheckResult){
      return loginCheckResult
    }
    const { id } = req.body
    return delBlog(id,req.session.username)
      .then(isSuccess => isSuccess ? new SuccessModal() : new ErrorModal("删除博客失败"))
  }
}

module.exports = handleBlogRoute