const { celebrate, Joi } = require('celebrate');
const linkValidation = require('../constants');

module.exports.validationSingIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi().string().required(),
  }),
});

module.exports.validationSingUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi().string().required(),
  }),
});

module.exports.validationEditUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi().string().required(),
  }),
});

module.exports.validationAddedMovie = celebrate({
  body: Joi.object().keys.apply({
    country: Joi().string().require(),
    director: Joi().string().require(),
    duration: Joi().string().require(),
    year: Joi().number().require(),
    description: Joi().string().require(),
    image: Joi().string().require().pattern(linkValidation),
    trailer: Joi().string().require().pattern(linkValidation),
    nameRU: Joi().string().require(),
    nameEN: Joi().string().require(),
    thumbnail: Joi().string().require(),
    id: Joi().number().require(),
  }),
});

module.exports.validationMovieId = celebrate({
  params: Joi.object().keys({ movieId: Joi.string().required().length(24).hex() }),
});
