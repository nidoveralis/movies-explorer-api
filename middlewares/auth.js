const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
   const authorization = req.cookies.jwt;
   console.log(req.cookies.jwt)
  //if(!authorization) {
    //next(console.log('net auth'))
  //}
  const token = authorization;
  console.log(token)
  let payload
  try{
    console.log('kkmjm')
    payload = jwt.verify(token, 'some-secret-key')
  }catch(err) {
   console.log("auth")
  }
  req.user = payload;
  next()
}