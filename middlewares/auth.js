const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
   const authorization = req.cookies.jwt;
  if(!authorization) {
    next(console.log('net auth'))
  }
  const token = authorization;
  let payload
  try{
    payload = jwt.verify(token, 'some-secret-key')
  }catch(err) {
   console.log(err)
  }
  req.user = payload;
  next()
}