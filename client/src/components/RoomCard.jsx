import React from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import UserIcon from '../images/user-icon.svg';

const RoomCard = ({ roomTitle, membersCount, roomID, user }) => {

  return (
    <Link to={'/room/' + roomID} >
      <div className="flex flex-row justify-between p-4 card rounded-box bg-base-200 hover:bg-base-300">
        <p>{roomTitle}</p>
        <div className="flex">
          <img src={UserIcon} alt="members" />
          <p className="ml-2">{membersCount}</p>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
