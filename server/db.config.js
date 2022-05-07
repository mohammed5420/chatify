const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(import.meta.env.CONNECTION_STRING, (err) => {
  console.log(err);
});

module.exports = mongoose;
