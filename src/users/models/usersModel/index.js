const mongoose = require('mongoose');
const userMethods = require('../../methods');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  firstname: String,
  lastname: String,
  address: String,
  addresss2: String,
  birthdate: Date,
  country: String,
  city: String,
  postalcode: String,
  password: String,
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  }
});

const Users = mongoose.model('Users', UsersSchema);

UsersSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next()
    })
    .catch(next)

});

userMethods(Users);

module.exports = Users;