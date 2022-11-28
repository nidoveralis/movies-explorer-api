const router = require('express').Router();
const {getMoveis, addMovie} = require('../controllers/movies');

router.get('/', getMoveis);
router.post('/', addMovie);
//router.delete('/_id', deleteMovie);

module.exports = router;