const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const {
  getUserData,
  updateUserData,
} = require('../controllers/users');
const { spacePasswordError, namePasswordError } = require('../utils/constants');

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
      .message(spacePasswordError),
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30)
      .pattern(/^\S*$/)
      .message(namePasswordError),
  }),
}), updateUserData);

module.exports = router;
