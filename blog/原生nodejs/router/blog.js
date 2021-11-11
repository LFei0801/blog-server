const {SuccessModal,ErrorModal} = require('../modal/resModal')
const {getBlogList,getSingleBlog,newBlog} = require('../controller/blog')

const handleBlogRoute = (req,res) => {
  const method = req.method

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
    const blog =  newBlog(blogData)
    return new SuccessModal(blog)
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