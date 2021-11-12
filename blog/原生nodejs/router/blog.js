const {SuccessModal,ErrorModal} = require('../modal/resModal')
const {
  getBlogList,
  getSingleBlog,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')

const handleBlogRoute = (req,res) => {
  const method = req.method
  const id = req.query.id

  // 获取博客列表
  if(method === "GET" && req.path === '/api/blog/list'){
    const author = req.query.author || ""
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
    req.body.author = "admin" // 正常来说，req.body是不会有author字段的，用假数据测试
    const blogData = req.body
    return newBlog(blogData)
      .then(id => new SuccessModal(id))
      .catch(() => new ErrorModal("server error"))
  }

  // 更新一篇博客 通过id
  if(method === "POST" && req.path === '/api/blog/update'){
    const blogData = req.body
    console.log(blogData)
    return updateBlog(id,blogData)
      .then(isSuccess => isSuccess ? new SuccessModal() : new ErrorModal("更新博客失败"))
  }

  // 删除一篇博客 通过id
  if(method === 'POST' && req.path === '/api/blog/del'){
    const { id } = req.body
    return  delBlog(id,"admin")
      .then(isSuccess => isSuccess ? new SuccessModal() : new ErrorModal("删除博客失败"))
  }
}

module.exports = handleBlogRoute