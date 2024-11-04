import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Map from './Map';
import StatusOverview from './StatusOverview';
import WorkerList from './WorkerList'; 
import '../../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState(200);

  const handleToggle = (width: number) => {
    setSidebarWidth(width);
  };

  return (
    <div className="dashboard-container flex">
      <Sidebar onToggle={handleToggle} />
      <div className="dashboard-content" style={{ marginLeft: `${sidebarWidth}px` }}>
        <Header sidebarWidth={sidebarWidth} />
        <main className="main-content p-4 h-full">
          <div className="flex justify-between items-start mb-4 w-full">
            <div className="flex-1">
              <StatusOverview />
            </div>
            <div className="w-[300px] ml-4"> 
              <WorkerList />
            </div>
          </div>
          
          <div className="w-full h-[550px] border border-black mt-2">
            <Map />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
