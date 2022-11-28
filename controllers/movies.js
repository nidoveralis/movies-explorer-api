const Movie = require('../models/movie');

module.exports.getMoveis = (req,res) => {
  Movie.find({})
    .then(data=> res.status(200).send(data))
    .catch((err)=>console.log(err))

}