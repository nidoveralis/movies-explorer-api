const jwt = require('jsonwebtoken');
const { developerMode } = require('../constants');
const IncorrectMailOrPassword = require('../errors/IncorrectMailPassword');

const { JWT_SECRET, NODE_ENV, mongoServer } = process.env;

module.exports = (req, res, next) => {
  console.log(JWT_SECRET, NODE_ENV, mongoServer)
  const token = req.cookies.jwt;
  if (!token) {
    next(new IncorrectMailOrPassword('Необходима авторизация.'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : developerMode);
  } catch (err) {
    next(new IncorrectMailOrPassword('Необходима авторизация.'));
    return;
  }
  req.user = payload;
  next();
};
