const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 300000, // 5 минут
  max: 60, // максимальное число запросов в заданый выше период
  message: 'Превышено число запросов'
});

module.exports = limiter;
