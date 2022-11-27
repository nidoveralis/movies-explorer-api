const router = require('express').Router;
const cookieParser = require('cookie-parser');

const user = require('./user');

router.use('/users', user);

module.exports = router;