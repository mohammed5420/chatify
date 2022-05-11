import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';
import Navigation from '../components/Navigation';
import Flower from '../images/flower.svg';
import googleIcon from '../images/google-icon.svg';
const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_BASE_URI}/auth/user`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data._json);
      })
      .catch((err) => {
        console.error({ err });
      });
  }, []);

  const handleClick = () => {
    axios
      .get(`${import.meta.env.VITE_SERVER_BASE_URI}/auth/user`, {
        withCredentials: true,
      })
      .then((res) => {
        navigate('/search');
        setUser(res.data._json);
      })
      .catch((err) => {
        // console.log({ err });
        if (err.response.status == 403) {
          window.open(
            `${import.meta.env.VITE_SERVER_BASE_URI}/auth/google`,
            'popup'
          );
        }
      });
  };
  return (
    <div className="">
      <Navigation />
      <div className="grid items-center gap-8 min-h-screen overflow-hidden">
        <div className="flex justify-between items-center flex-col lg:flex-row-reverse">
          <div className="w-full flex justify-evenly">
            <div className=""></div>
            <img
              src={Flower}
              className="w-28 my-16 md:my-0 md:w-36 lg:w-48 transform rotate-6 mr-12  rounded-lg"
            />
          </div>
          <div className="max-w-xl my-14 md:my-0">
            <h1 className="text-4xl md:text-6xl text-slate-100 font-bold">
              Chatify, The world's best rooms app
            </h1>
            <p className="py-6 text-2xl text-slate-400">
              Join or create rooms and talk about interesting topics.
            </p>
            <button
              className="btn btn-primary btn-lg capitalize gap-2"
              onClick={handleClick}
            >
              <img src={googleIcon} alt="google logo" />
              <span className="">Continue with google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
