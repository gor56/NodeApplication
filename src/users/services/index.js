const zenDesk = require('node-zendesk');

const succesUtils = require('../../utils/succes-utilities');

const errorUtils = require('../../utils/error-utilities');

const { zendesk } = require('../../config');

const client = zenDesk.createClient(zenDesk);


const {UsersModel} = require('../models');

function listUsers(req, res, next) {
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10;

  UsersModel.listAllUsers({ skip, limit })
    .then((users) => {

      client.users.list(function (err, req, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(JSON.stringify(result.map(function (user) {return user.name;}), null, 2, true));//gets the first page
        console.log("Total Users: "+result.length);
      });

      if(!users){
        return Promise.reject(new errorUtils.UserAuthorizationError('Users not found'));
      }
     succesUtils.handleGet(res, users)
      })
    .catch(next)
}

function getUser(req, res, next) {
  const {userId} = req.params;

  UsersModel.getUserById(userId)
    .then((user) => {
      if(!user){
        return Promise.reject(new errorUtils.UserAuthorizationError('User not found'));
      }
      succesUtils.handleGet(res, user)
    })
    .catch(next);
}

function updateUser(req, res, next) {
  const { userId } = req.params;
  const {firstname, lastname, birthdate, address, address2, country, city, postalcode, email, password} = req.body;
  const data = {firstname, lastname, birthdate, address, address2, country, city, postalcode, email, password};

  UsersModel.updateUserById(userId, data)
    .then((updatedUser) => {
      if(!updatedUser){
        return Promise.reject(new errorUtils.UserAuthorizationError('Users not found'));
      }
      succesUtils.handleUpdate(res, updatedUser)
    })
    .catch(next);
}

function removeUser(req, res, next) {
  const { userId } = req.params;

  UsersModel.removeUserById(userId)
    .then(() => {

      const zUserId = userId;
      const client = zd.createClient();
      client.tickets.delete(zUserId, function(err) {
        if (err) return handleError(err);
      });

      if(err){
        return Promise.reject(new errorUtils.PathNotFoundError('Wrong path'));
      }
      succesUtils.handleDelete(res)
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {firstname, lastname, birthdate, address, address2, country, city, postalcode, email, password} = req.body;
  const data = {firstname, lastname, birthdate, address, address2, country, city, postalcode, email, password};

  UsersModel.createUser(data)
    .then((result) => {

      const zenDeskUser = {
        "user": {
          "name": firstname,
          "email": email
        }
      };

      client.users.create(zenDeskUser, function (err, req, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(JSON.stringify(result, null, 2, true));
      });

      if(!result){
        return Promise.reject(new errorUtils.UserAuthorizationError('Users not autorized'));
      }

      succesUtils.handleCreate(res, result)
    })
    .catch(next);
}

module.exports = {
  createUser,
  getUser,
  listUsers,
  removeUser,
  updateUser
};