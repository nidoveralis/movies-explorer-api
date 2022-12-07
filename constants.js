const linkValidation = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;
const ERROR_CODE_INCORRECT_DATA = 400;
const ERROR_CODE_INCORRECT_MAIL_PASSWORD = 401;
const ERROR_CODE_FORBIDDEN = 403;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_EMAIL_USED = 409;
const ERROR_CODE_DEFAYLT = 500;
const developerMode = 'dev-secret';
const mongoServerDeveloper = 'mongodb://0.0.0.0:27017/moviesdbb';

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
};
