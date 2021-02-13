const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserMovies,
  createFilm,
  deleteFilm,
} = require('../controllers/movies');
const {
  urlStringError,
  rusNameMovieError,
  engNameMovieError,
} = require('../utils/constants');

router.get('/', getUserMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi
      .string()
      .required(),
    director: Joi
      .string()
      .required(),
    duration: Joi
      .number()
      .required(),
    year: Joi
      .string()
      .required(),
    description: Joi
      .string()
      .required(),
    image: Joi
      .string()
      .required()
      .pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/)
      .message(urlStringError),
    trailer: Joi
      .string()
      .required()
      .pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/)
      .message(urlStringError),
    thumbnail: Joi
      .string()
      .required()
      .pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/)
      .message(urlStringError),
    movieId: Joi
      .string()
      .required(),
    nameRU: Joi
      .string()
      .required()
      .pattern(/^[?!,.\-а-яА-ЯёЁ0-9\s]+$/)
      .message(rusNameMovieError),
    nameEN: Joi
      .string()
      .required()
      .pattern(/^[?!,.\-a-zA-Z0-9\s]+$/)
      .message(engNameMovieError),
  }),
}), createFilm);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .required()
      .hex()
      .length(24),
  }),
}), deleteFilm);

module.exports = router;
