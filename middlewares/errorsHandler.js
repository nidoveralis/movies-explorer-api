const { MESSAGE_DEFAYLT_ERROR } = require('../constants');

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? MESSAGE_DEFAYLT_ERROR : err.message;

  res.status(statusCode).send({ message });
  next();
};
