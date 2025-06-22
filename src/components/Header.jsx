import React, { useState } from 'react';
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Header({ toggleSidebar }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-600"
          onClick={toggleSidebar}
        >
          <BsJustify />
        </button>
        <h1 className="hidden md:block text-xl font-semibold text-gray-800 dark:text-white">
          Admin Dashboard
        </h1>
      </div>

      <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg w-1/3">
        <BsSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm w-full text-gray-800 dark:text-white"
        />
      </div>

      <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 relative">
        <button className="relative hover:text-blue-600">
          <BsFillBellFill className="text-xl" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-4 w-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>
        <button className="hover:text-blue-600">
          <BsFillEnvelopeFill className="text-xl" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="hover:text-blue-600 focus:outline-none"
          >
            <BsPersonCircle className="text-2xl" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
              <div className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
              <div
                onClick={() => {
                  navigate('/settings');
                  setProfileOpen(false);
                }}
                className="px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Settings
              </div>
              <div className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer">
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
