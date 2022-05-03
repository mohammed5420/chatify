import React, { useContext } from 'react';
import Logo from '../images/Logo.svg';
import { Link } from 'react-router-dom';
import Button from './Button';
import { UserContext } from '../../utils/UserContext';
const Navigation = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="flex justify-between items-center">
      <div className="logo">
        <img src={Logo} className="w-32" alt="chtify app logo" />
      </div>
      <ul className="flex justify-end items-center capitalize text-md font-semibold gap-6">
        <li className="">
          <Link to="/search">search</Link>
        </li>
        <li>
          <Link to="/create">create room</Link>
        </li>
        {/* <Button text="Join Room" primary={true}/> */}

        <div className="avatar flex items-center">
          {user ? (
            <>
              <p className="mr-2">{user.name}</p>
              <div className="w-8 rounded-full">
                <img referrerPolicy="no-referrer" src={user.picture} />
              </div>
            </>
          ) : (
            <button className="btn btn-primary">Login</button>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
