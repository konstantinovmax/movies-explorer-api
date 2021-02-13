const router = require('express').Router();
const authorizationRouter = require('./authorization');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { notFoundError } = require('../utils/constants');

router.use('/', authorizationRouter);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.all('/*', auth, () => {
  throw new NotFoundError(notFoundError);
});

module.exports = router;
