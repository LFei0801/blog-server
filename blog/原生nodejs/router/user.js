const {login} = require('../controller/user')
const {SuccessModal, ErrorModal} = require("../modal/resModal");
const {set} = require("../db/redis");

const handleUserRoute = (req,res) => {
  if(req.method === 'GET' && req.path === '/api/user/login'){
    const { username,password } = req.query
    return login(username,password).then(data => {
      if(data.username){
        // 绑定userid与用户真实信息，相当于 SESSION_DATA = {用户id：{username,password}}
        req.session = {
          username : data.username,
          password : data.password
        }
        // 同步到redis中
        set(req.sessionId,req.session)
        return new SuccessModal("登录成功")
      }
      return new ErrorModal("登录失败，用户不存在!")
    })
  }

  if(req.method === 'GET' && req.path === '/api/user/login-test'){
    if(req.session.username){
      return Promise.resolve(new SuccessModal(req.session))
    }
    return Promise.resolve(new ErrorModal("尚未登录"))
  }
}

module.exports = handleUserRoute