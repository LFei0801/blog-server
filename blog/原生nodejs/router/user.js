const handleUserRoute = (req,res) => {
  if(req.method === 'POST' && req.path === '/api/user/login'){
    return {
      msg:"登录接口"
    }
  }
}

module.exports = handleUserRoute