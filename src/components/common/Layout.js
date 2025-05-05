import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar - with collapsed state */}
      <Sidebar isCollapsed={isSidebarCollapsed} />

      {/* Spacer */}
      <div className="w-4 bg-gray-100 flex-shrink-0"></div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar - fixed at the top */}
        <Navbar onMenuClick={toggleSidebar} />

        {/* Content area with padding */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          <div className="bg-white rounded-lg shadow-sm p-6 m-w-full ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
