const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const {
  userIdIncorrectError,
  userCouldntFindError,
  emailAlreadyTakenError,
  invalidUserDataError,
  userRegistrationSuccess,
} = require('../utils/constants');

const getUserData = (req, res, next) => {
  User.findById(req.user._id)
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError(userIdIncorrectError);
      }
      return next(err);
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userCouldntFindError);
      }
      return res.status(200).send({ email: user.email, name: user.name, _id: user._id });
    })
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { email, name } = req.body;

  User.findOne({ email: email }) // eslint-disable-line
    .then((u) => {
      if (u) {
        throw new ConflictError('Указанный email уже занят');
      }
      User.findByIdAndUpdate(req.user._id, { email, name }, { runValidators: true, new: true })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(err.message);
          }
          return next(err);
        })
        .then((user) => {
          if (!user) {
            throw new NotFoundError(userCouldntFindError);
          }
          return res.status(200).send(user);
        })
        .catch(next);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  User.findOne({ email })
    .then((u) => {
      if (u) {
        throw new ConflictError(emailAlreadyTakenError);
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(err.message);
          }
          return next(err);
        })
        .then(() => {
          res.status(200).send({ successMessage: `${userRegistrationSuccess}` });
        })
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(invalidUserDataError);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(invalidUserDataError);
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserData,
  updateUserData,
  createUser,
  login,
};
