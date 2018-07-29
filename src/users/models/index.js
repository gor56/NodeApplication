const mongoose = require('mongoose');
const UsersModel = require('./usersModel');

mongoose.connect('mongodb://localhost:27017/NodeApplication', { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo.'))
  .catch(console.error);

const Models = {};

Models.UsersModel = UsersModel;

module.exports = Models;