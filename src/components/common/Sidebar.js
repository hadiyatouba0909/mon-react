import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import LogoutButton from "../modal/LogoutButton";

const Sidebar = ({ isCollapsed }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 flex-shrink-0`}
    >
      <div
        className={`h-full ${
          isDark ? "bg-gray-800" : "bg-indigo-600"
        } text-white flex flex-col transition-all duration-300 shadow-lg`}
      >
        {/* Profile section */}
        <div
          className={`p-4 border-b ${
            isDark ? "border-gray-700" : "border-indigo-500"
          } flex items-center justify-center mb-6`}
        >
          <div
            className={`${
              isCollapsed ? "w-10 h-10" : "w-20 h-20"
            } rounded-full overflow-hidden transition-all duration-300 border-2 ${
              isDark ? "border-indigo-600" : "border-indigo-500"
            }`}
          >
            <img
              src="https://images.pexels.com/photos/31936714/pexels-photo-31936714/free-photo-of-delicate-wildflower-in-sunlit-greenery.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-2 flex flex-col items-center">
          <Link
            to="/dashboard"
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-start"
            } px-4 py-3 mb-2 text-white rounded-lg ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-indigo-700 hover:bg-indigo-800"
            } transition-all ${isCollapsed ? "w-12" : "w-full"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${!isCollapsed && "mr-3"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            {!isCollapsed && (
              <span className="text-lg font-medium">Liste des produits</span>
            )}
          </Link>

          {/* Vous pouvez ajouter d'autres liens de navigation ici */}
        </nav>

        {/* Logout button */}
        <LogoutButton isCollapsed={isCollapsed} isDark={isDark} />
      </div>
    </div>
  );
};

export default Sidebar;
