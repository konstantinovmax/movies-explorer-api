const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserMovies,
  createFilm,
  deleteFilm,
} = require('../controllers/movies');
const { urlStringError } = require('../utils/constants');

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
      .pattern(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i)
      .message(urlStringError),
    trailer: Joi
      .string()
      .required()
      .pattern(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i)
      .message(urlStringError),
    thumbnail: Joi
      .string()
      .required()
      .pattern(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i)
      .message(urlStringError),
    movieId: Joi
      .number()
      .required(),
    nameRU: Joi
      .string()
      .required(),
    nameEN: Joi
      .string()
      .required(),
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
