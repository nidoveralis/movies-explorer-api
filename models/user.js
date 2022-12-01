const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

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
      message: 'Некорректный email',
    },
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCreditals = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (user === null) {
        console.log('net user');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            console.log('net match');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
