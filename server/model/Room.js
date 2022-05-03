const mongoose = require("mongoose");

const message = mongoose.Schema({
  senderID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "users",
  },
  content: {
    type: String,
    trim: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const roomSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  messages: {
    type: [message],
  },
  members: {
    type: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "users",
      },
    ],
  },
});

module.exports = mongoose.model("rooms", roomSchema);
