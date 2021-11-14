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
const SESSION_DATA = {}
const parseSession = (req) => {
  // 是否需要设置cookie
  let needSetCookie = false
  let userid = req.cookie.userid
  if(userid){
    // 如果SESSION_DATA中不存在userid字段，则初始化SESSION_DATA[userid] 字段
    if(!SESSION_DATA[userid]){
      SESSION_DATA[userid] = {}
    }
  }else{
    // 如果req.cookie中不存在userid这个属性，则需要设置cookie
    needSetCookie = true
    // 初始化userid
    userid = `${Date.now()}_${Math.round(Math.random() * 1000)}`
    SESSION_DATA[userid] = {}
  }
  // 绑定到 req.session这个对象属性中，方便后续操作
  req.session = SESSION_DATA[userid]
  return { needSetCookie,userid }
}


module.exports = {
  getPostData,
  parseCookie,
  getCookieExpires,
  parseSession,
  SESSION_DATA
}