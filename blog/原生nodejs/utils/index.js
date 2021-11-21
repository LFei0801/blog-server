const {get, set} = require("../db/redis");

// 解析post请求数据
const getPostData = (req)=>{
  return new Promise(((resolve, reject) => {
    if(req.method !== 'POST' || req.headers['content-type'] !== 'application/json'){
      resolve({})
      return
    }
    let postData = ''
    req.on('data',chunk => postData += chunk.toString())
    req.on('end',()=>{
      if(!postData){
        resolve({})
        return
      }
      resolve(JSON.parse(postData)) //Object类型
    })
  }))
}

// 解析cookie
const parseCookie = (req) => {
  req.cookie = {}
  // k1=v1;k2=v2 ... 这种形式
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(";").forEach(item=>{
    if(!item) return
    // k1=v1 这种字符串拆分成 [k1,v1]
    const [key,value] = item.split("=")
    req.cookie[key.trim()] = value.trim()
  })
}

// cookie过期时间
const getCookieExpires = () => {
  const date = new Date()
  date.setTime(date.getTime() + (24 * 60 * 60 * 1000))
  return date.toUTCString()
}

// 解析Session
/**
 *需要 从session中获取sessionId这个数据
 * 如果有这个数据，则不需要设置cookie
 * 没有这个数据，就需要设置cookie
 */
const parseSession = async (req) => {
  // 是否需要设置cookie
  let needSetCookie = false
  let userid = req.cookie.userid
  req.session = {}
  // 如果前端没有返回userid，则在redis设置这个userid
  if(!userid){
    needSetCookie = true
    userid = `${Date.now()}_${Math.round(Math.random() * 1000)}`
  }
  //  如果redis数据库中没有这个userid,则需要存储
  const val = await get(userid)
  if(val === null){
    needSetCookie = true
    set(userid,JSON.stringify({}))
  }else{
    // 有的话 ，绑定到req.session
    req.session = val
  }
  // 绑定属性
  req.sessionId = userid
  return { needSetCookie,userid }
}


module.exports = {
  getPostData,
  parseCookie,
  getCookieExpires,
  parseSession,
}