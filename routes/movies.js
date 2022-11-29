const router = require('express').Router();
const {getMoveis, addMovie, deleteMovie} = require('../controllers/movies');
const {validationAddedMovie, validationMovieId} = require('../validation/validation')

router.get('/', getMoveis);
router.post('/', validationAddedMovie, addMovie);
router.delete('/:movieId', validationMovieId, deleteMovie);

module.exports = router;