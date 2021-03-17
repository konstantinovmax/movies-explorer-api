const movieIdAlreadyTakenError = 'Указанный movieId уже занят';
const movieIdIncorrectError = 'Некорректно указан id фильма';
const movieCouldntFindError = 'Не удалось найти фильм';
const noAccessError = 'Нет доступа';
const movieDeletedMessage = 'Успешно удален фильм';

const userRegistrationSuccess = 'Успешная регистрация';
const userIdIncorrectError = 'Некорректно указан id пользователя';
const userCouldntFindError = 'Не удалось найти пользователя';
const emailAlreadyTakenError = 'Указанный email уже занят';
const invalidUserDataError = 'Некорректные почта или пароль';
const updateUserSuccess = 'Данные пользователя успешно изменены';

const urlStringError = 'Строка должна быть записана в виде URL-адреса';
const rusNameMovieError = 'Название фильма должно быть на русском языке';
const engNameMovieError = 'Название фильма должно быть на английском языке';

const invalidEmailError = 'Введенный email не соответствует условиям';
const spacePasswordError = 'Не допускается использование пробелов при создании пароля';
const namePasswordError = 'Не допускается использование пробелов в имени';

const needAuthError = 'Необходима авторизация';
const serverError = 'На сервере произошла ошибка';
const requestLimitExceedError = 'Превышено число запросов';
const notFoundError = 'Запрашиваемый ресурс не найден';

module.exports = {
  movieIdAlreadyTakenError,
  movieIdIncorrectError,
  movieCouldntFindError,
  noAccessError,
  movieDeletedMessage,
  userRegistrationSuccess,
  userIdIncorrectError,
  userCouldntFindError,
  emailAlreadyTakenError,
  invalidUserDataError,
  updateUserSuccess,
  urlStringError,
  rusNameMovieError,
  engNameMovieError,
  invalidEmailError,
  spacePasswordError,
  namePasswordError,
  notFoundError,
  needAuthError,
  serverError,
  requestLimitExceedError,
};
