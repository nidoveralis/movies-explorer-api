const ERROR_CODE_DEFAYLT = require('../constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_CODE_DEFAYLT;
  const message = statusCode === ERROR_CODE_DEFAYLT ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ message });
  next();
};
