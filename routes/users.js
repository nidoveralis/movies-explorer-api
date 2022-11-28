const router = require('express').Router();
const { getUser, editUser } = require('../controllers/user');

router.get('/', getUser)
router.patch('/me', editUser)

module.exports = router; 