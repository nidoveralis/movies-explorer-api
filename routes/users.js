const router = require('express').Router();
const { getUser, editUser } = require('../controllers/user');
const {validationEditUser} = require('../validation/validation')

router.get('/', getUser)
router.patch('/me', validationEditUser, editUser)

module.exports = router; 