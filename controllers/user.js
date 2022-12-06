const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { developerMode } = require('../constants');
const ErrorMailUsed = require('../errors/ErrorMailUsed');
const IncorrectData = require('../errors/IncorrectData');
const NotFound = require('../errors/NotFound');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, email } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => res.status(200).send({ name: user.name, email: user.email }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ErrorMailUsed('Пользователь с таким email уже зарегистрирован.'));
          // } if (statusCode == 400) {
          } if (err.name === 'ValidationError') {
            next(new IncorrectData('Переданы некорректные данные.'));
          } else {
            next(err.statusCode);
          }
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCreditals({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : developerMode, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
      res.status(200).send({ token });
    })
    .catch(() => {
      next();
    });
};

module.exports.exit = (req, res) => {
  res.clearCookie('jwt', { httpOnly: true });
  res.status(200).send({ message: 'Вы вышли.' });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        next(new NotFound('Пользователь не найден.'));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData('Некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.editUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectData('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(err);
      }
    });
};
