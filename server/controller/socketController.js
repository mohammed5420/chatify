const Room = require("../model/Room");

const populateEvents = async (io, event, data) => {
  io.emit(event, data);
};
const joinRoom = async (io, data) => {
  await Room.updateOne(
    { roomID: data.roomID },
    {
      $addToSet: {
        members: data.id,
      },
    }
  );
  const members = await Room.findOne(
    { roomID: data.roomID },
    { members: -1 }
  ).populate("members");
  // io.emit("join room",  {members} );
  // console.log(members.members);
  io.emit("join room", {
    members: members.members,
    roomID: data.roomID,
    message: `${data.name} join the room`,
  });
};

const leaveRoom = async (io, data) => {
  // console.log({ data });
  await Room.updateOne(
    { roomID: data.roomID },
    { $pull: { members: data.id } }
  );
  const roomMembers = await Room.findOne(
    { roomID: data.roomID },
    { members: -1 }
  ).populate("members");
  const { members } = roomMembers;
  io.broadcast.emit("leave room", {
    members,
    roomID: data.roomID,
    message: `
  ${data.name} left the room`,
  });
  // populateEvents(io, "leave room", members);
};

const sendMessage = async (io, data) => {
  // console.log(data);
  await Room.updateOne(
    { roomID: data.roomID },
    {
      $push: {
        messages: data,
      },
    }
  );
  const messages = await Room.findOne(
    { roomID: data.roomID },
    { messages: -1 }
  ).populate("messages.senderID");
  // io.emit("send message", { messages });
  // console.log({ messages });
  populateEvents(io, "send message", messages);
};

module.exports = {
  populateEvents,
  joinRoom,
  leaveRoom,
  sendMessage,
};
