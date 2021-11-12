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
    const listData = getBlogList(author,keyWord)
    return new SuccessModal(listData)
  }

  // 获取一篇博客接口
  if(method === "GET" && req.path === '/api/blog/detail'){
    const id = req.query.id
    const blog = getSingleBlog(id)
    return new SuccessModal(blog)
  }

  // 新增一篇博客
  if(method === "POST" && req.path === '/api/blog/new'){
    const blogData = req.body
    const blogId=  newBlog(blogData)
    return new SuccessModal(blogId)
  }

  // 更新一篇博客 通过id
  if(method === "POST" && req.path === '/api/blog/update'){
    const blogData = req.body
    return updateBlog(id, blogData) ? new SuccessModal("更新博客成功") : new ErrorModal("更新博客失败")
  }

  // 删除一篇博客 通过id
  if(method === 'POST' && req.path === '/api/blog/del'){
    return delBlog(id) ? new SuccessModal("删除博客成功") : new ErrorModal("删除博客失败")
  }
}

module.exports = handleBlogRoute