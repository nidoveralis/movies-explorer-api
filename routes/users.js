const router = require('express').Router();
const { getUserMe, editUser } = require('../controllers/user');
const { validationEditUser } = require('../validation/validation');

router.get('/me', getUserMe);
router.patch('/me', validationEditUser, editUser);

module.exports = router;
