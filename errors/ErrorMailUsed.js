module.exports = class ErroeMailUsed extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.errorMessage = message;
  }
};
