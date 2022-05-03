const mongoose = require("mongoose");

const User = mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  uid: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("users", User);
