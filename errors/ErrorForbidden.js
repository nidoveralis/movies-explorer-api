module.exports = class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.errorMessage = message;
  }
}