import React, { useState } from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

interface SidebarProps {
  onToggle: (sidebarWidth: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle(newIsOpen ? 200 : 56); 
  };

  return (
    <aside
      className={`bg-gray-800 h-full transition-all duration-300 fixed left-0 top-0 text-white ${
        isOpen ? 'w-48' : 'w-14'
      }`}
      style={{ height: '100vh' }}
    >
      <button className="text-white mt-4 mx-auto p-2" onClick={toggleSidebar}>
        {isOpen ? (
          <span className="flex flex-col items-center">
            <span className="block h-1 w-6 bg-white mb-1" style={{ width: '24px' }}></span>
            <span className="block h-1 w-5 bg-white mb-1" style={{ width: '20px' }}></span>
            <span className="block h-1 w-4 bg-white" style={{ width: '16px' }}></span>
          </span>
        ) : (
          <span className="flex flex-col items-center">
            <span className="block h-1 w-6 bg-white mb-1"></span>
            <span className="block h-1 w-5 bg-white mb-1"></span>
            <span className="block h-1 w-4 bg-white"></span>
          </span>
        )}
      </button>
      <nav className="mt-8 flex flex-col items-center">
        <ul className="list-none p-0 m-0">
          <li className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded mb-4">
            <span className="text-white text-xl mr-2">
              <FaHome />
            </span>
            {isOpen && <span className="text-white ml-2 text-lg">Dashboard</span>}
          </li>
          <li className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded mb-4">
            <span className="text-white text-xl mr-2">
              <FaUser />
            </span>
            {isOpen && <span className="text-white ml-2 text-lg">Profile</span>}
          </li>
          <li className="flex items-center p-2 cursor-pointer hover:bg-gray-700 rounded mb-4">
            <span className="text-white text-xl mr-2">
              <FaCog />
            </span>
            {isOpen && <span className="text-white ml-2 text-lg">Settings</span>}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
