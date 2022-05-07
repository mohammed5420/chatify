import React, { useContext, useState, useEffect } from 'react';
import Logo from '../images/Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';
import axios from 'axios';
const Navigation = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const NavElement = () => {
    const handleLogout = () => {
      axios
        .get(`${import.meta.env.VITE_SERVER_BASE_URI}/auth/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          setUser(null);
          navigate('/');
        })
        .catch((err) => {
          if (err.response.status == 304) {
            setUser(null);
            navigate('/');
          } else {
            console.error(err);
          }
        });
    };
    return (
      <ul
        className={`hidden md:flex justify-end items-center capitalize text-md font-semibold gap-6 z-10${
          active &&
          ' active w-full top-16 bg-base-200 py-2 px-4 rounded absolute'
        }`}
      >
        <li className="">
          <Link to="/search">search</Link>
        </li>
        <li>
          <Link to="/search">create room</Link>
        </li>

        {user ? (
          <li className={`flex items-center gap-6 ${active && ' flex-col'}`}>
            <p className="cursor-pointer" onClick={handleLogout}>
              Log out
            </p>
            <div className="avatar flex items-center">
              <p className="mr-2">{user.name}</p>
              <div className="w-8 rounded-full">
                <img referrerPolicy="no-referrer" src={user.picture} />
              </div>
            </div>
          </li>
        ) : (
          <li>
            <Link to="/" className="btn btn-primary">
              Login
            </Link>
          </li>
        )}
      </ul>
    );
  };

  return (
    <nav className="relative flex justify-between items-center">
      <div className="logo">
        <Link to="/">
          <img src={Logo} className="w-32" alt="chatify app logo" />
        </Link>
      </div>
      <NavElement />
      <div className="md:hidden">
        <button
          onClick={() => setActive(!active)}
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
