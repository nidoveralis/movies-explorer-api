const ERROR_CODE_EMAIL_USED = require('../constants');

module.exports = class ErroeMailUsed extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_EMAIL_USED;
    this.errorMessage = message;
  }
};
