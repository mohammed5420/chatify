const router = require("express").Router();
const {
  createRoom,
  getPublicRooms,
  deleteRoom,
  getRoomMessages,
  sendRoomMessage,
  searchForRoomByID,
} = require("../controller/roomController");

router.get("/", getPublicRooms);

router.get("/messages/:roomID", getRoomMessages);

router.post("/create", createRoom);

router.delete("/delete/:roomID", deleteRoom);

router.post("/sendmessage", sendRoomMessage);

router.post("/search", searchForRoomByID);

module.exports = router;
