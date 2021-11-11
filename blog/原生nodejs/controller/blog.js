// 根据作者和关键字获取博客列表
const getBlogList = (author,keyword) => {
  return [
    {
      id:0,
      title:"first title",
      author:"admin",
      createTime:1636599956825,
      content:"first blog content"
    },
    {
      id:1,
      title:"second title",
      author:"L Fei",
      createTime:1636600025977,
      content:"second blog content"
    }
  ]
}

// 获取一篇博客
const getSingleBlog = (id)=>{
  return {
    id:0,
    title:"first title",
    author:"admin",
    createTime:1636599956825,
    content:"first blog content"
  }
}

// 新增一篇博客
const newBlog = (blogData = {}) => {
  return {
    id:3
  }
}

module.exports = {
  getBlogList,
  getSingleBlog,
  newBlog
}