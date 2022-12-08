const router = require('express').Router();
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const { login, createUser, exit } = require('../controllers/user');
const { validationSingIn, validationSingUp } = require('../validation/validation');
const users = require('./users');
const movies = require('./movies');
const NotFound = require('../errors/NotFound');
const { MESSAGE_NOT_FOUND } = require('../constants');

router.post('/signin', validationSingIn, login);
router.post('/signup', validationSingUp, createUser);

router.use(cookieParser());
router.use('/users', auth, users);
router.use('/movies', auth, movies);
router.post('/signout', auth, exit);

router.use('*', auth, (req, res, next) => {
  next(new NotFound(MESSAGE_NOT_FOUND));
});

module.exports = router;
