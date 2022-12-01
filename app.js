const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./routes/router');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');

const { PORT = 3000 } = process.env;

const allowedCors = [
  'https://movie.diakova.nomoredomains.club',
  'http://movie.diakova.nomoredomains.club',
  'https://api.movie.diak.nomoredomains.club',
  'http://api.movie.diak.nomoredomains.club',
  'http://localhost:3000',
];

const app = express();

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const allowMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', allowMethods);
    return res.end();
  }
  return next();
});

// cors
// api.movie.diak.nomoredomains.club
// movie.diakova.nomoredomains.club
// 51.250.87.93

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/moviedb');

app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => console.log(PORT));
