import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  // Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  // Logout function
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const handleLogin = () => {
    navigate("/login");
  };

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50 ">
      <div className="container max-w-6xl mx-auto px-4">
        <nav className="flex justify-between items-center py-3">
          <Link to="/">
            <img
              src="../assets/images/logo.png"
              alt="logo"
              className="h-12 mr-3"
            />
          </Link>
          <div className="flex md:hidden">
            <button className="text-gray-800 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="#about" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link to="#facility" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              Facility
            </Link>
            <Link to="#contact" className="py-5 px-3 text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-2 relative">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="btn bg-gray-800 text-white px-4 py-2 rounded focus:outline-none"
                >
                  {user.UserName}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48">
                    <Link to="/homepage" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/emergency" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                      Emergency Contacts
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left w-full px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="btn bg-white text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white"
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
