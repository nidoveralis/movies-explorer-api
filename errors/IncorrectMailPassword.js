module.exports = class IncorrectMailOrPassword extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.errorMessage = message;
  }
};
