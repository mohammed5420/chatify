const app = require("express")();
require("./db.config");
require("dotenv").config();
const cookieSession = require("cookie-session");
const res = require("express/lib/response");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const roomRoutes = require("./routes/room");
const authVerifier = require("./middleware/authVerifier");
const cors = require("cors");
const morgan = require("morgan");
const {
  joinRoom,
  sendMessage,
  leaveRoom,
  populateEvents,
} = require("./controller/socketController");
require("./auth");

const webSocket = require("socket.io");
const express = require("express");
app.use(morgan("dev"));
app.enable("trust proxy");
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URI,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
    sameSite: "none",
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/room", authVerifier, roomRoutes);

app.get("/", authVerifier, (req, res) => {
  res.json(req.user);
});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log("app running on port 5000");
});

const io = webSocket(server, {
  cors: {
    origin: process.env.CLIENT_BASE_URI,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH"],
  },
});

io.on("connection", (socket) => {
  // console.log("New Connection from react");
  socket.on("new message", (data) => {
    console.log("new message");
    io.sockets.emit("new message", data);
  });
  socket.on("join room", async (data) => {
    const newData = await JSON.parse(data);
    // console.log("join member");
    joinRoom(io, newData);
  });
  socket.on("leave room", async (data) => {
    console.log("leave room");
    const newData = await JSON.parse(data);
    leaveRoom(socket, newData);
  });
  socket.on("send message", async (data) => {
    const newData = await JSON.parse(data);
    sendMessage(io, newData);
  });
});
