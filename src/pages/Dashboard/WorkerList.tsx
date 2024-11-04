import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp, FaUserCircle } from 'react-icons/fa';
import workersData from './workers.json'; 

interface Worker {
  id: number;
  name: string;
  status: string; 
}

const WorkerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);

  // Filtrer les workers 
  const filteredWorkers = workersData.workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = () => {
    setIsListVisible(!isListVisible);
  };

  // la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return 'bg-green-500';
      case 'Disconnected':
        return 'bg-red-500';
      case 'Suspicious':
        return 'bg-yellow-500';
      case 'In Danger':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-xs p-4 border rounded shadow">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-lg flex items-center">
          Worker Info
          <button onClick={handleToggle} aria-label="Toggle worker list" className="ml-2">
            {isListVisible ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </h2>

        <div className="flex items-center">
          <FaUserCircle className="text-gray-600 text-2xl" />
          {workersData.workers.length > 1 && (
            <span className="ml-1 text-gray-600">+{workersData.workers.length - 1}</span>
          )}
        </div>
      </div>

      <input
        type="text"
        placeholder="Search workers..."
        className="p-1 border border-gray-300 rounded w-full mb-2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search workers"
      />

      {(searchTerm || isListVisible) && (
        <ul className="list-disc pl-5">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map(worker => (
              <li key={worker.id} className="flex items-center mb-2 cursor-pointer hover:text-blue-500">
                <span className={`w-3 h-3 rounded-full ${getStatusColor(worker.status)} mr-2`} />
                {worker.name}
              </li>
            ))
          ) : (
            <li className="text-gray-500">
              {searchTerm ? "No workers found" : "No workers available"}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default WorkerList;
