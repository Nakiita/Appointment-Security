import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import getUser from "../utils/getUser";


const UserAvatar = ({ user, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fetchedUser = getUser();
  const [previewImage, setPreviewImage] = useState(
    fetchedUser.profilePicture || null
  );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    if (fetchedUser.profilePicture) {
      setPreviewImage(fetchedUser.profilePicture);
    }
  }, [fetchedUser.profilePicture]);

  return (
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative mr-6">
      <button
        type="button"
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-30"
        id="user-menu-button"
        aria-expanded={dropdownOpen}
        onClick={toggleDropdown}
      >
        <span className="sr-only ">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={previewImage}
          alt="user photo"
        />
      </button>
      {dropdownOpen && (
        <div
          className="z-50 absolute right-0 top-10 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 ">
              {user.UserName}
            </span>
            <span className="block text-sm text-gray-500 truncate ">
              {user.email}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <Link
                to="/user-profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              >
                Profile
              </Link>
            </li>
            <li>
              <Link to="/homepage" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Dashboard
              </Link>
              <Link to="/emergency" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                Emergency Contacts
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
      <button
        data-collapse-toggle="navbar-user"
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
        aria-controls="navbar-user"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
  );
};

export default UserAvatar;
