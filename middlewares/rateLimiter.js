const rateLimiter = require('express-rate-limit');

module.exports.limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
