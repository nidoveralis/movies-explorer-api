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

module.exports.exit=(req,res)=>{
  res.clearCookie('jwt', {httpOnly: true});
    res.status(200).send({message: "OK"})

}

module.exports.getUser = (req, res) => {
  User.find({})
  .then((user) => res.status(200).send(user))
  .catch((err)=>console.log(err))
};

module.exports.getMe = (req, res) => {
  User.findbyId(req.user._id)
  .then((user) => res.status(200).send(user))
  .catch((err)=>console.log(err))
};

module.exports.editUser = (req, res) => {
  const {name, email} = req.body
  User.findByIdAndUpdate(req.user._id, {name, email})///in change
    .then((user) => res.status(200).send(user))
    .catch((err)=>console.log(err))
};