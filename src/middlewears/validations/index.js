const joi = require('joi');

const {InvalidInputError} = require('../../utils/error-utilities');
const validationErrorHandler = require('../../utils/validation-error-handler');

module.exports = {
  validateRegisterUser: (req, res, next) => {
    joi.validate({body: req.body}, {
      body: {
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        address: joi.string().required(),
        address2: joi.string().required(),
        birthdate: joi.string().required(),
        country: joi.string().required(),
        city: joi.string().required(),
        postalcode: joi.string().required(),
        password: joi.string().min(6).required(),
        email: joi.string().email().required()
      }
    }, (err) => {
      if (err) {
        validationErrorHandler.handleError(res, new InvalidInputError(err.details[0].message))
      }
      next()
    });
  },

  validateGetUser: (req, res, next) => {
    joi.validate({params: req.params}, {
      params: {
        userId: joi.string().length(24).required()
      }
    }, (err => {
      if (err) {
        validationErrorHandler.handleError(res, new InvalidInputError(err.details[0].message))
      }
      next()
    }));
  },

  validateRemoveUser: (req, res, next) => {
    joi.validate({params: req.params}, {
      params: {
        userId: joi.string().length(24).required()
      }
    }, (err => {
      if (err) {
        validationErrorHandler.handleError(res, new InvalidInputError(err.details[0].message))
      }
      next()
    }));
  },

  validateUpdateUser: (req, res, next) => {
    joi.validate({body: req.body}, {
      body: {
        firstname: joi.string().required(),
        lastname: joi.string().required(),
        address: joi.string().required(),
        address2: joi.string().required(),
        birthdate: joi.string().required(),
        country: joi.string().required(),
        city: joi.string().required(),
        postalcode: joi.string().required(),
        password: joi.string().min(6).required(),
        email: joi.string().email().required()
      }
    }, (err) => {
      if (err) {
        validationErrorHandler.handleError(res, new InvalidInputError(err.details[0].message))
      }
      next()
    })
  }
};