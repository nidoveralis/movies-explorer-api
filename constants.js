const linkValidation = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;
const ERROR_CODE_INCORRECT_DATA = 400;
const ERROR_CODE_INCORRECT_MAIL_PASSWORD = 401;
const ERROR_CODE_FORBIDDEN = 403;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_EMAIL_USED = 409;
const ERROR_CODE_DEFAYLT = 500;
const MESSAGE_INCORRECT_DATA = 'Переданы некорректные данные.';
const MESSAGE_MOVIE_NOT_FOUND = 'Фильм не найден.';
const MESSAGE_USER_NOT_FOUND = 'Пользователь не найден.';
const MESSAGE_NOT_FOUND = 'Страница не найдена.';
const MESSAGE_NOT_YOUR_MOVIE = 'Нельзя удалить чужой фильм';
const MESSAGE_INCORRECT_ID = 'Некорректный id';
const MESSAGE_DELETE_MOVIE = 'Фильм успешно удалён';
const MESSAGE_USED_EMAIL = 'Пользователь с таким email уже зарегистрирован.';
const MESSAGE_WELCOME = 'Вы вышли.';
const MESSAGE_NEED_AUTH = 'Необходима авторизация.';
const MESSAGE_DEFAYLT_ERROR = 'На сервере произошла ошибка';
const MESSAGE_INCORRECT_LINK = 'Некорректная ссылка';
const MESSAGE_INCORRECT_MAIL_OR_PASSWOR = 'Неправильные почта или пароль.';

const developerMode = 'dev-secret';
const mongoServerDeveloper = 'mongodb://0.0.0.0:27017/moviesdb';

module.exports = {
  ERROR_CODE_INCORRECT_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_DEFAYLT,
  ERROR_CODE_EMAIL_USED,
  ERROR_CODE_INCORRECT_MAIL_PASSWORD,
  ERROR_CODE_FORBIDDEN,
  linkValidation,
  developerMode,
  mongoServerDeveloper,
  MESSAGE_INCORRECT_DATA,
  MESSAGE_MOVIE_NOT_FOUND,
  MESSAGE_NOT_YOUR_MOVIE,
  MESSAGE_INCORRECT_ID,
  MESSAGE_DELETE_MOVIE,
  MESSAGE_USED_EMAIL,
  MESSAGE_WELCOME,
  MESSAGE_USER_NOT_FOUND,
  MESSAGE_NEED_AUTH,
  MESSAGE_DEFAYLT_ERROR,
  MESSAGE_INCORRECT_LINK,
  MESSAGE_INCORRECT_MAIL_OR_PASSWOR,
  MESSAGE_NOT_FOUND,
};
