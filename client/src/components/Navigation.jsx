import React, { useContext } from 'react';
import Logo from '../images/Logo.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../../utils/UserContext';
const Navigation = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="flex justify-between items-center">
      <div className="logo">
        <Link to="/">
          <img src={Logo} className="w-32" alt="chtify app logo" />
        </Link>
      </div>
      <ul className="flex justify-end items-center capitalize text-md font-semibold gap-6">
        <li className="">
          <Link to="/search">search</Link>
        </li>
        <li>
          <Link to="/search">create room</Link>
        </li>

        {user ? (
          <li className="flex items-center gap-6">
            <p className="">Log out</p>
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
    </nav>
  );
};

export default Navigation;
