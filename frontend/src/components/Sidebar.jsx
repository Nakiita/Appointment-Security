import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear(); // Clear user session
    navigate("/login"); // Navigate to login after logout
    window.location.reload(); // Reload the page to clear all state
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle the visibility of the dropdown
  };

  return (
    <div className="w-72 flex flex-col bg-white shadow-lg">
      <div className="flex p-6">
        <Link to="/">
          <img
            src="../assets/images/logo.png"
            alt="logo"
            className="h-12 mr-3"
          />
        </Link>
      </div>
      <nav className="flex flex-col space-y-1 text-lg font-semibold p-4">
        <Link to="/admin" className="px-4 py-2 rounded hover:bg-gray-100 transition duration-200">Doctor</Link>
        <Link to="/admin/appointments" className="px-4 py-2 rounded hover:bg-gray-100 transition duration-200">Appointment</Link>
        <Link to="/admin/users" className="px-4 py-2 rounded hover:bg-gray-100 transition duration-200">User</Link>
        <Link to="/admin/log" className="px-4 py-2 rounded hover:bg-gray-100 transition duration-200">Activity Log</Link>
      </nav>
    </div>
  );
};

export default Sidebar;