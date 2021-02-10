const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createFilm = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
      return next(err);
    })
    .catch(next);
};

const deleteFilm = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Некорректно указан id фильма');
      }
      return next(err);
    })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Не удалось найти фильм');
      }
      return Movie.findById(req.params.movieId)
        .then(() => {
          if (movie.owner.toString() !== req.user._id) {
            throw new ForbiddenError('Нет доступа');
          }
          return Movie.findByIdAndRemove(req.params.movieId)
            .then((m) => {
              res.status(200).send(m);
            });
        });
    })
    .catch(next);
};

module.exports = {
  getUserMovies,
  createFilm,
  deleteFilm,
};
