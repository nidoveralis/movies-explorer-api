const express = require('express');
const {error} = require('celebrate');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const {PORT=3000} = process.env;
const app = express();
const router = require('./routes/router');
const {errorLogger, requestLogger} = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/moviedb');

app.use(requestLogger)
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler)

app.listen(PORT, ()=>console.log(PORT))