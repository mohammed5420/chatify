import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Member from '../components/Member';
import UserIcon from '../images/user-icon.svg';
import LeftIcon from '../images/short_left.svg';
//components
import Navigation from '../components/Navigation';
import { io } from 'socket.io-client';
import axios from 'axios';
import MessagesContainer from '../components/MessagesContainer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { UserContext } from '../../utils/UserContext';
const Room = () => {
  const params = useParams();
  const { user, setUser } = useContext(UserContext);
  const [messages, setMessages] = useState(null);
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMembers, setRoomMembers] = useState(null);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState({ canShow: false, message: '' });
  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SERVER_BASE_URI}`);
    if (user == null) {
      axios
        .get(`${import.meta.env.VITE_SERVER_BASE_URI}/auth/user`, {
          withCredentials: true,
        })
        .then((res) => {
          setUser(res.data._json);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            navigate('/');
          }
          console.error({ err });
        });
    } else {
      // console.log('EMit Join room');
      socket.emit(
        'join room',
        JSON.stringify({
          roomID: params.id,
          id: user.id,
          name: user.name,
        })
      );
    }

    return () => {
      socket.disconnect();
    };
  }, [user]);
  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_SERVER_BASE_URI}`);
    socket.on('send message', ({ messages }) => {
      setMessages(messages);
    });

    socket.on('leave room', async (data) => {
      // // console.log(data);
      // const { members } = data;
      // // console.log(data.members);
      if (data.roomID == params.id) {
        setRoomMembers(data.members);
        setShowAlert({ canShow: true, message: data.message });
        setTimeout(() => {
          setShowAlert({ canShow: false, message: data.message });
        }, 3000);
      }
    });

    socket.on('join room', async (data) => {
      if (data.roomID == params.id) {
        setRoomMembers(data.members);
        setShowAlert({ canShow: true, message: data.message });
        setTimeout(() => {
          setShowAlert({ canShow: false, message: data.message });
        }, 3000);
      }
    });

    axios
      .get(
        `${import.meta.env.VITE_SERVER_BASE_URI}/room/messages/${params.id}`,
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        setTimeout(async () => {
          setRoomDetails({
            roomTitle: data.roomData.name,
            roomDescription: data.roomData.description,
            roomID: data.roomData.roomID,
          });
          setMessages(data.roomData.messages);
        }, 3000);
      });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e, message, setMessage) => {
    const placeHolderMessage = {
      senderID: {
        uid: user.sub,
        userName: user.name,
        picture: user.picture,
      },
      content: message,
      createdAt: Date.now()
    };
    setMessages(messages => [...messages, placeHolderMessage]);
    const socket = io(`${import.meta.env.VITE_SERVER_BASE_URI}`);

    e.preventDefault();
    socket.emit(
      'send message',
      JSON.stringify({ roomID: params.id, senderID: user.id, content: message })
    );
    setMessage('');
  };
  const handleLeaveRoom = () => {
    const socket = io(`${import.meta.env.VITE_SERVER_BASE_URI}`);
    socket.emit(
      'leave room',
      JSON.stringify({ roomID: params.id, id: user.id, name: user.name })
    );
  };

  return (
    <div>
      {user ? (
        <>
          <Navigation />
          {roomDetails ? (
            <>
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-6 gap-8">
                <div className="col-span-1 lg:col-span-2 order-2 lg:order-1">
                  <div className="grid gap-4">
                    <Link to="/search">
                      <button
                        className="btn btn-link gap-2"
                        onClick={handleLeaveRoom}
                      >
                        <img src={LeftIcon} alt="Back" />
                        Leave Room
                      </button>
                    </Link>
                    <h2 className="text-xl font-bold text-slate-100">
                      {roomDetails.roomTitle}
                    </h2>
                    <div className="">
                      <h3 className="text-md text-slate-100 mb-2">
                        Description
                      </h3>
                      <p>{roomDetails.roomDescription}</p>
                    </div>

                    <div className="">
                      <h3 className="text-md text-slate-100 mb-2">Room ID</h3>
                      <p>{roomDetails.roomID}</p>
                    </div>
                    <div className="">
                      <h3 className="text-md text-slate-100 capitalize mb-2">
                        Members Count
                      </h3>
                      <div className="flex">
                        <img src={UserIcon} alt="members" />
                        <p className="ml-2">
                          {roomMembers ? roomMembers.length : '0'}
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <h3 className="text-md text-slate-100 capitalize mb-2">
                        Members List
                      </h3>
                      <div className="w-full max-w-xs card bg-base-200 rounded-md p-4 gap-4">
                        {roomMembers ? (
                          roomMembers.map((member, idx) => {
                            return (
                              <Member
                                key={idx}
                                avatar={member.picture}
                                name={member.userName}
                              />
                            );
                          })
                        ) : (
                          <p>Room is empty</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <MessagesContainer
                  user={user}
                  handleSubmit={handleSubmit}
                  showAlert={showAlert}
                  messages={messages}
                />
              </div>
            </>
          ) : (
            <LoadingSkeleton />
          )}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Room;
