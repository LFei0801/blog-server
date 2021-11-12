const {loginCheck} = require('../controller/user')
const {SuccessModal, ErrorModal} = require("../modal/resModal");

const handleUserRoute = (req,res) => {
  if(req.method === 'POST' && req.path === '/api/user/login'){
    const { username,password } = req.body
    // console.log(username,password)
    return loginCheck(username,password).then(data => {
      console.log(data)
      return data.username ? new SuccessModal() : new ErrorModal("用户不存在")
    })
  }
}

module.exports = handleUserRoute