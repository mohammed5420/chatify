const { v4: uuid } = require("uuid");
const Room = require("../model/Room");
const getRoomMessages = async (req, res) => {
  const { roomID } = req.params;
  const roomData = await Room.findOne({ roomID: roomID }).populate([
    "messages.senderID",
    "members.member",
  ]);
  return res.json({ roomData });
};

const getPublicRooms = async (req, res) => {
  const rooms = await Room.find({ type: "public" });
  if (rooms == null || rooms.length == 0) {
    return res.json({ message: "No live rooms" });
  }
  return res.json({ length: rooms.length, data: rooms });
};

const createRoom = async (req, res) => {
  const body = req.body;
  // console.log({ body });
  const roomID = uuid();
  const roomObject = {
    roomID,
    name: body.name,
    description: body.description,
    type: body.type,
  };
  await Room.create(roomObject);
  // res.json({ message: "room Successfully sent" });
  return res.json({ redirectUrl: "/room/" + roomID });
};

const deleteRoom = async (req, res) => {
  const { roomID } = req.params;

  await Room.deleteOne({ roomID });
  res.json({ message: "room deleted successfully" });
};

const sendRoomMessage = async (req, res) => {
  const body = req.body;
  const newMessage = {
    senderID: body.senderID,
    content: body.content,
  };

  await Room.updateOne(
    { roomID: body.roomID },
    {
      $push: {
        messages: newMessage,
      },
    }
  );
  return res.json({ message: "message sent" });
};

const searchForRoomByID = async (req, res) => {
  const { roomID } = req.body;
  const room = await Room.findOne({ roomID });
  if (room == null) {
    return res.json({ status: "Error", message: "This room ID is invalid" });
  }
  return res.status(200).json({ redirectUrl: "/room/" + roomID });
};

module.exports = {
  createRoom,
  deleteRoom,
  getPublicRooms,
  getRoomMessages,
  sendRoomMessage,
  searchForRoomByID,
};
