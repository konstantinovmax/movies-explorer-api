require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, MONGO_URL } = process.env;
const router = require('./routes/index');
const limiter = require('./middlewares/limiter');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = 3000;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/movies-explorerdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger); // Логгер запросов
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use('/', router);
app.use(errorLogger); // Логгер ошибок
app.use(errors());
app.use(errorsHandler);

app.listen(PORT);
