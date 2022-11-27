module.exports = class ErrorDefault extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.errorMessage = message;
  }
}