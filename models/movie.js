const mongoose = require('mongoose');
const { isURL } = require('validator');
const { MESSAGE_INCORRECT_LINK } = require('../constants');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (v) => isURL(v, { required_protocol: true }),
      message: MESSAGE_INCORRECT_LINK,
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (v) => isURL(v, { required_protocol: true }),
      message: MESSAGE_INCORRECT_LINK,
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (v) => isURL(v, { required_protocol: true }),
      message: MESSAGE_INCORRECT_LINK,
    },
  },
  owner: {
    required: true,
    type: mongoose.ObjectId,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model('movie', movieSchema);
