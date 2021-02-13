const { serverError } = require('../utils/constants');

const errorsHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? serverError : message });
};

module.exports = errorsHandler;
