const mongoose = require('mongoose');

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
      validator(v) { // eslint-disable-next-line no-useless-escape
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: 'Строка должна быть записана в виде URL-адреса',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) { // eslint-disable-next-line no-useless-escape
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: 'Строка должна быть записана в виде URL-адреса',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) { // eslint-disable-next-line no-useless-escape
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
      },
      message: 'Строка должна быть записана в виде URL-адреса',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^[?!,.а-яА-ЯёЁ0-9\s]+$/.test(v);
      },
      message: 'Название фильма должно быть на русском языке',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^[?!,.a-zA-Z0-9\s]+$/.test(v);
      },
      message: 'Название фильма должно быть на английском языке',
    },
  },
});

const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;
