const parser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const usersApi = require('./routes/users');
const errorHandler = require('./middlewears/error-handler');

const errorsUtil = require('./utils/error-utilities');
const {PathNotFoundError} = errorsUtil;

const app = express();

app.use(morgan('dev'));

app.use(parser.urlencoded({limit: '5mb', extended: false}));
app.use(parser.json({limit: '5mb'}));


app.use('/users', usersApi);

app.use((req, res, next) => {
  return next(new PathNotFoundError('Specified path is not found.'));
});

app.use(errorHandler.handleError);

module.exports = app;

