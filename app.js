require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const PORT = 3000;
const app = express();

mongoose.connect('mongodb://localhost:27017/movies-explorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).pattern(/^\S*$/).message('Не допускается использование пробелов'), // eslint-disable-line
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);
app.all('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errors());
app.use((err, req, res, next) => { // eslint-disable-line
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер: http://localhost:3000/'); // eslint-disable-line
});
