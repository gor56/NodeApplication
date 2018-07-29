module.exports = (Users) => {
  /**
   * @description List all users.
   */
  Users.listAllUsers = (options) => {
    const { skip, limit } = options;

    return Users.find({}).skip(skip).limit(limit);
  };

  /**
   * @description Get users by Id.
   */
  Users.getUserById = (userId) => {
    return Users.findOne({_id: userId}, {password: false});
  };

  /**
   * @description Create user.
   */
  Users.createUser = (userData) => {
    return Users.create(userData)
      .then((user) => ({userId: user._id}));
  };

  /**
   * @description Delete users by Id.
   */
  Users.removeUserById = (userId) => {
    return Users.deleteOne({_id: userId});
  };

  /**
   * @description Update user by Id.
   */
  Users.updateUserById = (userId, updateData) => {
    const options = { new: true };

    return Users.findOneAndUpdate({_id: userId}, updateData, options);
  };
};
