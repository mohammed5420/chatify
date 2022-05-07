const app = require("express")();
require("./db.config");
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
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
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
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/room", authVerifier, roomRoutes);

app.get("/", authVerifier, (req, res) => {
  res.json(req.user);
});

const server = app.listen(5000, () => {
  console.log("app running on port 5000");
});

const io = webSocket(server, {
  cors: {
    origin: "http://localhost:3000",
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
