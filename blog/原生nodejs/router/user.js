const {loginCheck} = require('../controller/user')
const {SuccessModal, ErrorModal} = require("../modal/resModal");

const handleUserRoute = (req,res) => {
  if(req.method === 'POST' && req.path === '/api/user/login'){
    console.log(req.body)
    const { username,password } = req.body
    // console.log(username,password)
    return loginCheck(username,password) ? new SuccessModal("登录成功") : new ErrorModal('登录失败')
  }
}

module.exports = handleUserRoute