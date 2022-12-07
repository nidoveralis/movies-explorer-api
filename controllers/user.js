const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { developerMode } = require('../constants');
const ErrorMailUsed = require('../errors/ErrorMailUsed');
const IncorrectData = require('../errors/IncorrectData');
const NotFound = require('../errors/NotFound');
const {
  MESSAGE_INCORRECT_DATA,
  MESSAGE_INCORRECT_ID,
  MESSAGE_USED_EMAIL,
  MESSAGE_WELCOME,
  MESSAGE_USER_NOT_FOUND,
} = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    })
      .then((user) => res.send({
        name: user.name, email: user.email,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ErrorMailUsed(MESSAGE_USED_EMAIL));
          return;
        }
        if (err.name === 'ValidationError') {
          next(new IncorrectData(MESSAGE_INCORRECT_DATA));
        } else {
          next(err);
        }
      }));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCreditals({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : developerMode, { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
      res.status(200).send({ token });
    })
    .catch(next);
};

module.exports.exit = (req, res) => {
  res.clearCookie('jwt', { httpOnly: true });
  res.status(200).send({ message: MESSAGE_WELCOME });
};

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        next(new NotFound(MESSAGE_USER_NOT_FOUND));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectData(MESSAGE_INCORRECT_ID));
      } else {
        next(err);
      }
    });
};

module.exports.editUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, new: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ErrorMailUsed(MESSAGE_USED_EMAIL));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new IncorrectData(MESSAGE_INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};
