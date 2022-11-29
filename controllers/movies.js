const movie = require('../models/movie');
const Movie = require('../models/movie');

module.exports.getMoveis = (req,res) => {
  Movie.find({})
    .then(data=> res.status(200).send(data))
    .catch((err)=>console.log(err))
}
module.exports.addMovie = (req,res)=>{
  const owner = req.user._id;
  console.log(req.body)
  const {
    id,
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
    id,
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
      id: data.id,
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
      })
    )
    .catch((err)=>console.log(err))
}

module.exports.deleteMovie = (req,res) =>{
  console.log(req.params.movieId)
  Movie.findById(req.params.movieId)
  .then((movie)=>{
    res.send({data:movie })
    return movie.remove();
  })
  .catch((err)=>console.log(err))
  }