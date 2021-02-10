const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserMovies,
  createFilm,
  deleteFilm,
} = require('../controllers/movies');

router.get('/', getUserMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).message('Строка должна быть записана в виде URL-адреса'), // eslint-disable-line
    trailer: Joi.string().required().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).message('Строка должна быть записана в виде URL-адреса'), // eslint-disable-line
    thumbnail: Joi.string().required().pattern(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/).message('Строка должна быть записана в виде URL-адреса'), // eslint-disable-line
    nameRU: Joi.string().required().pattern(/^[?!,.а-яА-ЯёЁ0-9\s]+$/).message('Название фильма должно быть на русском языке'),
    nameEN: Joi.string().required().pattern(/^[?!,.a-zA-Z0-9\s]+$/).message('Название фильма должно быть на английском языке'),
  }),
}), createFilm);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().alphanum().length(24),
  }),
}), deleteFilm);

module.exports = router;
