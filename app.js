require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const router = require('./routes');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');

const { PORT = 3000, NODE_ENV, mongoServer } = process.env;

const allowedCors = [
  'https://movie.diakova.nomoredomains.club',
  'http://movie.diakova.nomoredomains.club',
  'https://api.movie.diak.nomoredomains.club',
  'http://api.movie.diak.nomoredomains.club',
  'http://localhost:3000',
];

const app = express();
app.use(helmet());

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(NODE_ENV === 'production' ? mongoServer : 'mongodb://0.0.0.0:27017/moviedb');

app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => console.log(PORT));
