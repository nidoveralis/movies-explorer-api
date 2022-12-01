const mongoose = require('mongoose');
const { isURL } = require('validator');

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
    type: Number,
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
      message: 'Некорректная ссылка',
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (v) => isURL(v, { required_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (v) => isURL(v, { required_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    required: true,
    type: mongoose.ObjectId,
  },
  id: { /// ///fix
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
