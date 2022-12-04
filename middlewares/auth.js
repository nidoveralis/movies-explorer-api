const jwt = require('jsonwebtoken');
const { JWT_SECRET, NODE_ENV } = process.env;
const IncorrectMailOrPassword = require('../errors/IncorrectMailPassword');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(JWT_SECRET, NODE_ENV);
  if (!token) {
    next(new IncorrectMailOrPassword('Необходима авторизация.'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // JWT_SECRET=517ba74d3bc900db5f820165235d63fb84d69f34bba38b9685be361783d8996f
  } catch (err) {
    next(new IncorrectMailOrPassword('Необходима авторизация.'));
    return;
  }
  req.user = payload;
  next();
};
