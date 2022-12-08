const { ERROR_CODE_FORBIDDEN } = require('../constants');

module.exports = class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_FORBIDDEN;
    this.errorMessage = message;
  }
};
