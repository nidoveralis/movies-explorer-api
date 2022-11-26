const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userShema = new mongoose.Shema ({
  name: {
    required: true,
    type: String,
    maxLength: 30,
    minLength: 2,
  },
  email : {
    required: true,
    type: String,
    unique: true,
    validate: {
      validator: (v)=> isEmail(v),
      message: 'Некорректный email',
    }
  },
  password: {
    required: true,
    type: String,
    select: false
  }
}, { versionKey: false },);

module.exports = mongoose.model('user', userShema);