// src/pages/Dashboard/RealTimeClock.tsx
import React, { useEffect, useState } from 'react';

const RealTimeClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId); 
  }, []);

  return (
    <div className="text-gray-800 font-bold text-lg bg-gray-200 p-2 rounded shadow-md">
      {time.toLocaleTimeString()} 
    </div>
  );
};

export default RealTimeClock;
