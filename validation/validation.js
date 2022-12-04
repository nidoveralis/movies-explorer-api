const { celebrate, Joi } = require('celebrate');
const { linkValidation } = require('../constants');

module.exports.validationSingIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationSingUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validationEditUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

module.exports.validationAddedMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkValidation),
    trailerLink: Joi.string().required().pattern(linkValidation),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(linkValidation),
    id: Joi.number().required(),
  }),
});

module.exports.validationMovieId = celebrate({
  params: Joi.object().keys({ movieId: Joi.string().required().length(24).hex() }),
});
