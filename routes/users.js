const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUserData,
  updateUserData,
} = require('../controllers/users');

router.get('/me', getUserData);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi
      .string()
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
}), updateUserData);

module.exports = router;
