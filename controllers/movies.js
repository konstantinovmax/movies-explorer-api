const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const {
  movieIdAlreadyTakenError,
  movieIdIncorrectError,
  movieCouldntFindError,
  noAccessError,
  movieDeletedMessage,
} = require('../utils/constants');

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
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.findOne({ movieId })
    .then((m) => {
      if (m) {
        throw new ConflictError(movieIdAlreadyTakenError);
      }
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
        movieId,
        nameRU,
        nameEN,
      })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(err.message);
          }
          return next(err);
        })
        .then((movie) => res.status(200).send(movie))
        .catch(next);
    })
    .catch(next);
};

const deleteFilm = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError(movieIdIncorrectError);
      }
      return next(err);
    })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieCouldntFindError);
      }
      return Movie.findById(req.params.movieId)
        .then(() => {
          if (movie.owner.toString() !== req.user._id) {
            throw new ForbiddenError(noAccessError);
          }
          return Movie.findByIdAndRemove(req.params.movieId)
            .then((m) => {
              res.status(200).send({ message: `${movieDeletedMessage} '${m.nameRU}'` });
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
