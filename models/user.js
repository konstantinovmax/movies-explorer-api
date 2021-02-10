const mongoose = require('mongoose');
const validatorjs = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validatorjs.isEmail(v);
      },
      message: 'Введенный email не соответствует условиям',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        return /^\S*$/.test(v);
      },
      message: 'Не допускается использование пробелов в пароле',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
