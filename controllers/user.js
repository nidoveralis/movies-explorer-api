const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorMailUsed = require('../errors/ErrorMailUsed');
const IncorrectData = require('../errors/IncorrectData');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res) => {
  const {name, email} = req.body
  bcrypt.hash(req.body.password, 10)
    .then((hash)=>{
      User.create({name, email, password: hash})
      .then((user) => res.status(200).send({name: user.name, email: user.email}))
      .catch((err)=>{
        if(err.code === 11000) {
          next(new ErrorMailUsed('Пользователь с таким email уже зарегистрирован.'))
        }if(err.name === 'ValidationError'){
          next(new IncorrectData('Переданы некорректные данные.'))
        }else {
          next(err)
        }
        })
    })
};

module.exports.login = (req, res, next) => {
  const { email, password} = req.body;
  return User.findUserByCreditals({email, password})
    .then((user)=> {
      const token = jwt.sign({_id: user._id}, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {expiresIn: '7d'})
      res.cookie('jwt', token, {maxAge: 3600000, httpOnly: true})
      res.status(200).send({token})
    })
};

module.exports.exit=(req,res)=>{
  res.clearCookie('jwt', {httpOnly: true});
    res.status(200).send({message: 'Вы вышли.'})
}

module.exports.getUser = (req, res, next) => {
  User.find({})
  .then((user) => res.status(200).send(user))
  .catch(next)
};

module.exports.getMe = (req, res, next) => {
  User.findbyId(req.user._id)
  .then((user) => res.status(200).send(user))
  .catch(next)
};

module.exports.editUser = (req, res,next) => {
  const {name, email} = req.body
  User.findByIdAndUpdate(req.user._id, {name, email}, { runValidators: true, new: true })
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new IncorrectData('Переданы некорректные данные при обновлении профиля.'));
    } else {
      next(err);
    }
  });
};