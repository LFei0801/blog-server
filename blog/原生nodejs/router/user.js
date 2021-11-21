const {login} = require('../controller/user')
const {SuccessModal, ErrorModal} = require("../modal/resModal");
const {set} = require("../db/redis");

const handleUserRoute = (req,res) => {
  // 登录接口
  if(req.method === 'POST' && req.path === '/api/user/login'){
    const { username,password } = req.body
    return login(username,password).then(data => {
      if(data.username){
        // 绑定userid与用户真实信息，相当于 SESSION_DATA = {用户id：{username,password}}
        req.session = {
          username : data.username,
          password : data.password
        }
        // 同步到redis中
        set(req.sessionId,req.session)
        // 返回用户ID给客户端
        return new SuccessModal(req.sessionId,"登录成功")
      }
      return new ErrorModal("登录失败，用户不存在!")
    })
  }

  // 获取用户接口
  if(req.method === "GET" && req.path === '/api/user/me'){
    const { id } = req.query
    return id === req.sessionId ?
      Promise.resolve(new SuccessModal(req.session.username)) :
      Promise.resolve(new ErrorModal())
  }

  // if(req.method === 'GET' && req.path === '/api/user/login-test'){
  //   if(req.session.username){
  //     return Promise.resolve(new SuccessModal(req.session))
  //   }
  //   return Promise.resolve(new ErrorModal("尚未登录"))
  // }
}

module.exports = handleUserRoute