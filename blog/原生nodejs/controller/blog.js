/***
 * 根据作者名和关键字查找所有博客
 * @param author 作者名
 * @param keyword 关键字
 * @returns {[{createTime: number, author: string, id: number, title: string, content: string}, {createTime: number, author: string, id: number, title: string, content: string}]}
 */
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

/***
 * 获取一篇博客内容
 * @param id 博客id
 * @returns {{createTime: number, author: string, id: number, title: string, content: string}} 博客对象
 */
const getSingleBlog = (id)=>{
  return {
    id:0,
    title:"first title",
    author:"admin",
    createTime:1636599956825,
    content:"first blog content"
  }
}

/***
 * 新增博客
 * @param blogData 新增博客的内容，包含title和content属性
 * @returns {{id: number}} 返回新增博客的id
 */
const newBlog = (blogData = {}) => {
  // blogData 包含title,content属性
  return {
    id:3
  }
}

/***
 * 更新博客
 * @param id 博客的id
 * @param blogData 更新的内容，包含title和content属性
 * @returns {boolean} 是否更新成功
 */
const updateBlog = (id,blogData = {}) => {
  return true
}

/***
 * 删除博客
 * @param id 博客id
 * @returns {boolean} 是否删除成功
 */
const delBlog = (id) => {
  return true
}

module.exports = {
  getBlogList,
  getSingleBlog,
  newBlog,
  updateBlog,
  delBlog
}