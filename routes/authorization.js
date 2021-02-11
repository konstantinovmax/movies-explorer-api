const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required()
      .min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
      .required()
      .min(8)
      .pattern(/^\S*$/)
      .message('Не допускается использование пробелов при создании пароля'),
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .pattern(/^\S*$/)
      .message('Не допускается использование пробелов в имени'),
  }),
}), createUser);

module.exports = router;
