const {exec} = require('../db/mysql')

/***
 * 根据作者名和关键字查找所有博客
 * @param author 作者名
 * @param keyword 关键字
 * @returns {Promise<[]>} sql执行后的promise对象
 */
const getBlogList = (author,keyword) => {
  let sql = "select * from blogs where 1=1 "
  if(author){
    sql += `and author = "${author}" `
  }
  if(keyword){
    sql += `and title like "%${keyword}%" `
  }
  sql += 'order by createtime desc;'
  return exec(sql)
}

/***
 * 获取一篇博客内容，返回数据对象，没有该数据时返回 undefined
 * @param id 博客id
 * @returns {Promise<object>} sql执行后的Promise
 */
const getSingleBlog = (id)=>{
  const sql = `select * from blogs where id='${id}';`
  return exec(sql).then(rows => rows[0])
}

/***
 * 新增博客
 * @param blogData 新增博客的内容，包含title和content属性
 * @returns {Promise<number>} 返回新增博客的id
 */
const newBlog = (blogData = {}) => {
  // blogData 包含title,content,author属性
  const {title,content,author} = blogData
  const createtime = Date.now()
  const sql = `insert into blogs(title,content,createtime,author) 
        values('${title}','${content}','${createtime}','${author}');`
  // insertId 插入数据的id
  return exec(sql).then(data => data.insertId)
}

/***
 * 更新博客
 * @param id 博客的id
 * @param blogData 更新的内容，包含title和content属性
 * @returns {Promise<boolean>} 返回是否更新成功
 */
const updateBlog = (id,blogData = {}) => {
  const  {title,content} = blogData
  const sql = `update blogs set title='${title}',content='${content}' where id = ${id};`
  return exec(sql).then(data => data.affectedRows > 0)
}

/***
 * 删除博客
 * @param id 博客id
 * @param author 作者名
 * @returns {Promise<boolean>} 是否删除成功
 */
const delBlog = (id,author) => {
  console.log(id,author)
  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(data => data.affectedRows > 0)
}

module.exports = {
  getBlogList,
  getSingleBlog,
  newBlog,
  updateBlog,
  delBlog
}