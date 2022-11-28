const Movie = require('../models/movie');

module.exports.getMoveis = (req,res) => {
  Movie.find({})
    .then(data=> res.status(200).send(data))
    .catch((err)=>console.log(err))
}
module.exports.addMovie = (req,res)=>{
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,trailerLink,
    thumbnail,
    nameRU,
    nameEN} = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,trailerLink,
    thumbnail,
    owner,
    nameRU,
    nameEN})
    .then(data=>res.status(200).send({
      country:data.country,
      director: data.director,
      duration: data.duration,
      year: data.year,
      description: data.description,
      image: data.image,
      trailerLink: data.trailerLink,
      thumbnail:data.thumbnail,
      nameRU: data.nameRU,
      nameEN: data.nameEN
    }))
    .catch((err)=>console.log(err))
}