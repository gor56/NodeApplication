module.exports = {
  handleGet: (res, result) => {
    const responseData = {
      message: 'Successfully fetched',
      status: 200,
      data: result
    };

    res.status(200).json(responseData)

  },

  handleCreate: (res, result) => {
    const responseData = {
      message: 'Successfully created',
      status: 201,
      data: result
    };

    res.status(201).json(responseData)
  },

  handleDelete: (res) => {
    const responseData = {
      message: 'Successfully deleted',
      status: 204
    };

    res.status(204).json(responseData);
  },

  handleUpdate: (res, result) => {
    const responseData = {
      message: 'Successfully updated',
      status: 200
    };
    res.status(200).json(responseData);
  }
};