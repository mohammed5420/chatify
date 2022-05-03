import React from 'react';

const Member = ({ avatar, name }) => {
  return (
    <div className="flex avatar items-center hover:bg-base-100 transition p-1 rounded-md">
      <div className="w-10 rounded-full mr-2">
        <img src={avatar} alt={name} />
      </div>
      <h4 className="text-md font-semibold">{name}</h4>
    </div>
  );
};

export default Member;
