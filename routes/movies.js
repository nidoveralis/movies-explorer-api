const router = require('express').Router();
const {getMoveis, addMovie, deleteMovie} = require('../controllers/movies');

router.get('/', getMoveis);
router.post('/', addMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;