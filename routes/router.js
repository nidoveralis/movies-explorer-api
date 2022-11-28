const router = require('express').Router();
const cookieParser = require('cookie-parser');

const auth = require('../middlewares/auth');
const {login, createUser} = require('../controllers/user');
const users = require('./users');
const movies = require('./movies')

router.post('/signin', login);
router.post('/signup', createUser);

router.use(cookieParser());
router.use('/users', auth, users);
router.use('/movies', auth, movies);

module.exports = router;