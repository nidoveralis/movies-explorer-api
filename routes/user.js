const router = require('express').Router;
const { getUser, editUser } = require('../controllers/user');

router.get('/me', getUser)
router.patch('/me', editUser)

module.exports = router;