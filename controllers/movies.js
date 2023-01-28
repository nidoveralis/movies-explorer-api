const Movie = require('../models/movie');
const IncorrectData = require('../errors/IncorrectData');
const NotFound = require('../errors/NotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');
const {
  MESSAGE_INCORRECT_DATA,
  MESSAGE_MOVIE_NOT_FOUND,
  MESSAGE_NOT_YOUR_MOVIE,
  MESSAGE_INCORRECT_ID,
  MESSAGE_DELETE_MOVIE,
} = require('../constants');

module.exports.getMoveis = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((data) => res.status(200).send({ data }))
    .catch(next);
};
module.exports.addMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image, trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    nameRU,
    nameEN,
  })
    .then((data) => res.status(200).send({
      movieId: data.movieId,
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image,
      trailerLink: data.trailerLink,
      thumbnail: data.thumbnail,
      owner: data.owner,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData(MESSAGE_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie == null) {
        next(new NotFound(MESSAGE_MOVIE_NOT_FOUND));
      } else if (JSON.stringify(req.user._id) !== JSON.stringify(movie.owner)) {
        return next(new ErrorForbidden(MESSAGE_NOT_YOUR_MOVIE));
      }
      return movie.remove()
        .then(() => res.send({ message: MESSAGE_DELETE_MOVIE }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData(MESSAGE_INCORRECT_ID));
      } else {
        next(err);
      }
    });
};
