
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import RealTimeClock from './RealTimeClock'; 

interface HeaderProps {
  sidebarWidth: number;
}

const Header: React.FC<HeaderProps> = ({ sidebarWidth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="bg-white text-black h-16 flex items-center justify-between px-4 shadow-lg transition-all duration-300">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center">
        <RealTimeClock /> 
        <button 
          className="text-gray-600 hover:text-gray-800 p-2 rounded flex items-center ml-4" 
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-gray-600" /> 
        </button>
      </div>
    </header>
  );
};

export default Header;
