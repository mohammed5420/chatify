const app = require("express")();
require("./db.config");
require("dotenv").config();
const passport = require("passport");
const roomRoutes = require("./routes/room");
const cors = require("cors");
const morgan = require("morgan");
const {
  joinRoom,
  sendMessage,
  leaveRoom,
} = require("./controller/socketController");

const webSocket = require("socket.io");
const express = require("express");
const { createUser } = require("./controller/userController");
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/room", roomRoutes);
app.post("/user/create-user", createUser);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("app running on port 5000");
});

const io = webSocket(server, {
  cors: {},
});

io.on("connection", (socket) => {
  // console.log("New Connection from react");
  socket.on("new message", (data) => {
    // console.log("new message");
    io.sockets.emit("new message", data);
  });
  socket.on("join room", async (data) => {
    const newData = await JSON.parse(data);
    // console.log("join member");
    joinRoom(io, newData);
  });
  socket.on("leave room", async (data) => {
    // console.log("leave room");
    const newData = await JSON.parse(data);
    leaveRoom(socket, newData);
  });
  socket.on("send message", async (data) => {
    const newData = await JSON.parse(data);
    sendMessage(io, newData);
  });
});
