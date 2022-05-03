import React from 'react';
import moment from 'moment';
const Message = ({ message, user }) => {
  // console.count("Message Render");
  return (
    <div
      dir={message.senderID.uid === user.sub ? 'rtl' : 'ltr'}
      className="flex gap-2"
    >
      <div className="avatar">
        <div className=" w-10 h-10  rounded-full mr-2">
          <img src={message.senderID.picture} alt={message.senderID.userName} />
        </div>
      </div>

      <div className="space-y-1 max-w-md w-full">
        <p className="text-md text-primary">{message.senderID.userName}</p>
        <div className="max-w-fit">
          <div className="message bg-base-300 px-3 py-2 rounded-md ">
            <p className="text-md text-slate-100">{message.content}</p>
          </div>
          <p dir="ltr" className="text-slate-400 w-full text-right">
            {moment(message.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
