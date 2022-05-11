import React, { useRef, useState } from 'react';

const CreateRoom = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'public',
  });
  // const handleFormChange = (e) => {
  const handleFormChange = (e) => {
    // console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // }
  return (
    <form
      action=""
      className="space-y-4"
      onSubmit={(e) => handleSubmit(e, formData)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Room Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder=""
            className="input input-bordered w-full "
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Room Type</span>
          </label>
          <select
            className="select w-full "
            name="type"
            onChange={handleFormChange}
            value={formData.type}
          >
            <option defaultValue disabled>
              Select Room Type
            </option>

            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Room description</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder=""
          name="description"
          value={formData.description}
          onChange={handleFormChange}
        ></textarea>
      </div>
      <div className="">
        <button
          className="capitalize btn btn-primary w-full"
          onClick={(e) => handleSubmit(e, formData)}
        >
          Create room
        </button>
      </div>
    </form>
  );
};

export default CreateRoom;
