const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const {name, email} = req.body
  bcrypt.hash(req.body.password, 10)
    .then((hash)=>{
      User.create({name, email, password: hash})
      .then((user) => res.status(200).send({name: user.name, email: user.email}))
      .catch((err)=>console.log(err))
    })
};

module.exports.login = (req, res) => {
  const { email, password} = req.body;
  return User.findUserByCreditals({email, password})
    .then((user)=> {
      const token = jwt.sign({_id: user._id}, 'some-secret-key', {expiresIn: '7d'})
      res.cookie('jwt', token, {maxAge: 3600000, httpOnly: true})
      res.status(200).send({name: user.name, email: user.email, token})
    })
};

module.exports.getUser = (req, res) => {
  User.find({})
  .then((user) => res.status(200).send(user))
  .catch((err)=>console.log(err))
};

module.exports.getMe = (req, res) => {
  console.log('in getMe')
  User.findbyId(req.user._id)
  .then((user) => res.status(200).send(user))
  .catch((err)=>console.log(err))
};

module.exports.editUser = (req, res) => {
  console.log(req.body, res.body)
  const {name, email, password} = req.body
  User.findByIdAndUpdate('638326417080d48ae24e0ffd', {name, email, password})///in change
    .then((user) => res.status(200).send(user))
    .catch((err)=>console.log(err))
};