const mongoose = require('mongoose');
const validatorjs = require('validator');
const {
  urlStringErrorError,
  rusNameMovieError,
  engNameMovieError,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validatorjs.isURL(v);
      },
      message: urlStringErrorError,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validatorjs.isURL(v);
      },
      message: urlStringErrorError,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validatorjs.isURL(v);
      },
      message: urlStringErrorError,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^[?!,.\-а-яА-ЯёЁ0-9\s]+$/.test(v);
      },
      message: rusNameMovieError,
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^[?!,.\-a-zA-Z0-9\s]+$/.test(v);
      },
      message: engNameMovieError,
    },
  },
});

const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;
