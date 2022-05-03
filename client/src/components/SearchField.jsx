import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../images/search-icon.svg';
const SearchField = () => {
  const [searchInput, setSearchInput] = useState('');
  const [showMessage, setShowMessage] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/room/search', { roomID: searchInput })
      .then((res) => {
        if (res.data.redirectUrl != null) {
          setShowMessage(null);
          navigate(res.data.redirectUrl);
        } else {
          setShowMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.error('🔥', err);
      });
  };
  return (
    <div className="w-full max-w-xs relative">
      <form action="" onSubmit={handleSubmit}>
        <img
          className="absolute top-4 left-4"
          src={SearchIcon}
          alt="search icon"
        />
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for room"
          className="input input-bordered w-full pl-10"
        />
      </form>
      {showMessage && (
        <div className="mt-4 ">
          <div className='flex justify-center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className='ml-2'>{showMessage}.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchField;
