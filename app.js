const express = require('express');
const {error} = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {PORT=3000} = process.env;
const app = express();
const router = require('./routes/router')

//mongoose.connect('mongodb://localhost:27017/moviedb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/moviedb');

app.use(router);

app.listen(PORT, ()=>console.log(PORT))