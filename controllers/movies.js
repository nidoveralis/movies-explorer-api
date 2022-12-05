const Movie = require('../models/movie');
const IncorrectData = require('../errors/IncorrectData');
const NotFound = require('../errors/NotFound');
const ErrorForbidden = require('../errors/ErrorForbidden');

module.exports.getMoveis = (req, res, next) => {
  Movie.find({})
    .then((data) => res.status(200).send(data))
    .catch(next);
};
module.exports.addMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    id,
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
    id,
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
      id: data.id,
      country: data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image,
      trailerLink: data.trailerLink,
      thumbnail: data.thumbnail,
      nameRU: data.nameRU,
      nameEN: data.nameEN,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie == null) {
        next(new NotFound('Фильм не найден.'));
      } else if (JSON.stringify(req.user._id) !== JSON.stringify(movie.owner)) {
        next(new ErrorForbidden('Нельзя удалить чужую карточку'));
      }
      return movie.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Некорректный id'));
      } else {
        next(err);
      }
    });
};
