const jwt = require('jsonwebtoken');
const { developerMode } = require('../constants');
const IncorrectMailOrPassword = require('../errors/IncorrectMailPassword');
const { MESSAGE_NEED_AUTH } = require('../constants');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    next(new IncorrectMailOrPassword(MESSAGE_NEED_AUTH));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : developerMode);
  } catch (err) {
    next(new IncorrectMailOrPassword(MESSAGE_NEED_AUTH));
    return;
  }
  req.user = payload;
  next();
};
