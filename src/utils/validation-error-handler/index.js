module.exports = {
  handleError: (res, errorMessage) => {
    const responseData = {
      status: 404,
      code: 'InvalidInput',
      message: errorMessage
    };

    res.status(404).json(responseData)
  }
};