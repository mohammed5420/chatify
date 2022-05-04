import axios from 'axios';
import React, { useEffect, useState, useId, useContext } from 'react';
import Button from '../components/Button';
import Navigation from '../components/Navigation';
import RoomCard from '../components/RoomCard';
import SearchIcon from '../images/search-icon.svg';
import { useNavigate } from 'react-router-dom';
import CreateRoom from '../components/CreateRoom';
import { io } from 'socket.io-client';
import SearchField from '../components/SearchField';
import { UserContext } from '../../utils/UserContext';
const Search = () => {
  const navigate = useNavigate();
  const [roomForm, setRoomForm] = useState({
    name: '',
    type: 'public',
    description: '',
  });

  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    axios
      .get('http://localhost:5000/auth/user', { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUser(res.data._json);
      })
      .catch((err) => {
        if (err.response.status == 403) {
          navigate('/');
        }
        console.error({ err });
      });
  }, []);
  const [liveRooms, setLiveRooms] = useState(null);
  // const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:5000/room/').then((res) => {
      setLiveRooms(res.data.data);
    });
    const socket = io('http://localhost:5000');

    socket.on('leave room', () => {
      axios.get('http://localhost:5000/room/').then((res) => {
        setLiveRooms(res.data.data);
      });
    });

    socket.on('join room', () => {
      axios.get('http://localhost:5000/room/').then((res) => {
        setLiveRooms(res.data.data);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const createNewRoom = (e, data) => {
    e.preventDefault();
    console.log(data);
    axios
      .post(
        'http://localhost:5000/room/create',
        {
          name: data.name,
          description: data.description,
          type: data.type,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate(res.data.redirectUrl);
      })
      .catch((err) => {
        console.error('🔥', err);
      });
  };

  return (
    <div>
      {user && (
        <>
          <Navigation />
          <div className="flex gap-6 items-center justify-center flex-col mt-16">
            <h2 className="text-lg font-bold text-slate-100 text-center w-full max-w-md ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              assumenda voluptates ut nam.
            </h2>
            <div className="flex flex-col w-full border-opacity-50 max-w-md">
              <div className="grid place-items-center">
                <SearchField />
              </div>

              <div className="divider">OR</div>
              <div className="grid  place-items-center">
                <label
                  htmlFor="my-modal"
                  className="btn btn-primary modal-button"
                >
                  create room
                </label>

                <input type="checkbox" id="my-modal" className="modal-toggle" />
                <div className="modal">
                  <div className="modal-box relative bg-base-300">
                    <div className="modal-action absolute right-2 top-2 mt-0">
                      <label
                        htmlFor="my-modal"
                        className="btn btn-circle btn-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </label>
                    </div>
                    <CreateRoom handleSubmit={createNewRoom} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 p-4 w-full max-w-2xl card bg-base-200 rounded-md">
              <h3 className="text-slate-100 font-medium mb-4">Live Rooms</h3>
              <div className="">
                {liveRooms ? (
                  liveRooms.map((room, idx) => {
                    return (
                      <RoomCard
                        roomID={room.roomID}
                        key={idx}
                        roomTitle={room.name}
                        user={user}
                        membersCount={room.members.length}
                      />
                    );
                  })
                ) : (
                  <p className="text-center text-slate-500">
                    No current live Rooms
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
