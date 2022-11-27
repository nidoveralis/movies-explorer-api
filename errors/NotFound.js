module.exports = class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.errorMessage = message;
  }
}