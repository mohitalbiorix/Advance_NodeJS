const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { default: isEmail } = require('validator/lib/isemail');

// user Schema
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
    validate: {
        validator: isEmail,
        message: "Invalid Email"
    },
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  tc: {
    type: Boolean,
    require: true,
  },
});


const User = mongoose.model('users',userSchema);

module.exports = User;
