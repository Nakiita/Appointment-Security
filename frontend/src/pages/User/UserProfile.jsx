import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserApi } from "../../apis/Api";
import getUser from "../../utils/getUser";
import { toast } from "react-toastify";
import { BsPencilSquare } from 'react-icons/bs';

const UserProfile = () => {
  const navigate = useNavigate();
  const fetchedUser = getUser();
  const [user, setUser] = useState({
    id: fetchedUser._id,
    UserName: fetchedUser.UserName,
    email: fetchedUser.email,
    phoneNumber: fetchedUser.phoneNumber,
    address: fetchedUser.address,
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewImage, setPreviewImage] = useState(fetchedUser.profilePicture || null);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (fetchedUser.profilePicture) {
      setPreviewImage(fetchedUser.profilePicture);
    }
  }, [fetchedUser.profilePicture]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageEdit = () => {
    fileInputRef.current.click();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("UserName", user.UserName);
    formData.append("email", user.email);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("address", user.address);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }
    try {
      const res = await updateUserApi(user.id, formData);
      if (res.data.success) {
        toast.success("Profile updated successfully!");
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile. Internal Server Error!");
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center mt-24 mb-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="mt-2 text-xl font-semibold text-black flex justify-center">
          User Information
        </h2>
        <div className="flex flex-col items-center pb-4">
          <input
            ref={fileInputRef}
            id="profileImage"
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />

          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleImageEdit}
          >
            <img
              src={previewImage}
              className="w-24 h-24 rounded-full mt-2"
              alt="Profile"
            />
            {isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-full">
                <BsPencilSquare className="text-white text-2xl" />
              </div>
            )}
          </div>

        </div>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="UserName"
              value={user.UserName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className=" text-black rounded border py-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-black text-white rounded py-2 px-4 hover:bg-black"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
