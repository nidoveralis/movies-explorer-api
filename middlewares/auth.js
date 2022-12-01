const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const IncorrectMailOrPassword = require('../errors/IncorrectMailPassword');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new IncorrectMailOrPassword('Необходима авторизация.'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new IncorrectMailOrPassword('Необходима авторизация.'));
    return;
  }
  req.user = payload;
  next();
};
