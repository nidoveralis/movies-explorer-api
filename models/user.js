const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const IncorrectImailOrPassword = require('../errors/IncorrectMailPassword');
const { MESSAGE_INCORRECT_LINK, MESSAGE_INCORRECT_MAIL_OR_PASSWOR } = require('../constants');

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    maxLength: 30,
    minLength: 2,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: MESSAGE_INCORRECT_LINK,
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCreditals = function findUser({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        throw new IncorrectImailOrPassword(MESSAGE_INCORRECT_MAIL_OR_PASSWOR);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new IncorrectImailOrPassword(MESSAGE_INCORRECT_MAIL_OR_PASSWOR);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
