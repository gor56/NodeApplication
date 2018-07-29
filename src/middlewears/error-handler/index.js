const Errors = {
  PathNotFoundError: {
    status: 404,
    message: 'NotFound'
  },

  UserAuthorizationError: {
    status: 401,
    message: 'Unauthorized'
  },

  Default: {
    status: 500,
    message: 'InternalServerError'
  }
};

function handleError(err, req, res) {
  const errorName = err.name;
  const errorResponse = Errors[errorName] || Errors.Default;

  errorResponse.message = err.message;

  res.status(errorResponse.status).json(errorResponse);
}

module.exports = {
  handleError
};