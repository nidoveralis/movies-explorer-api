const mongoose = require('mongoose');
const { isUrl } = require('validator');

const movieSchema = new mongoose.Schema ({
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
  duryearation: {
    required: true,
    type: Number,
  },
  description: {
    required: true,
    type: Number,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (v)=>isUrl(v, { required_protocol: true }),
      message: 'Некорректная ссылка'
    }
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (v)=>isUrl(v, { required_protocol: true }),
      message: 'Некорректная ссылка'
    }
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (v)=>isUrl(v, { required_protocol: true }),
      message: 'Некорректная ссылка'
    }
  },
  owner: {
    required: true,
    type: mongoose.ObjectId
  },
  movieId: {//////fix
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEn: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model('movie', movieSchema);