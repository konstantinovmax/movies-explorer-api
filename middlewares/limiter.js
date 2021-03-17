const rateLimit = require('express-rate-limit');
const { requestLimitExceedError } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 300000, // 5 минут
  max: 200, // максимальное число запросов в заданый выше период
  message: requestLimitExceedError,
});

module.exports = limiter;
