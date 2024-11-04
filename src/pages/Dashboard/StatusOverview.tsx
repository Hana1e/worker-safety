import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import workersData from './workers.json';

const StatusOverview: React.FC = () => {
    const [statusCounts, setStatusCounts] = useState({
        connected: 0,
        disconnected: 0,
        suspicious: 0,
        inDanger: 0
    });
    const [dangerAlerts, setDangerAlerts] = useState<any[]>([]);
    const [showAlerts, setShowAlerts] = useState(false);

    useEffect(() => {
        const counts = {
            connected: workersData.workers.filter(worker => worker.status === "Connected").length,
            disconnected: workersData.workers.filter(worker => worker.status === "Disconnected").length,
            suspicious: workersData.workers.filter(worker => worker.status === "Suspicious").length,
            inDanger: workersData.workers.filter(worker => worker.status === "In Danger").length
        };
        setStatusCounts(counts);

        const dangerWorkers = workersData.workers.filter(worker => worker.status === "In Danger");
        setDangerAlerts(dangerWorkers);
    }, []);

    return (
        <div className="relative p-0 flex items-center space-x-4">
            <div
                onMouseEnter={() => setShowAlerts(true)}
                onMouseLeave={() => setShowAlerts(false)}
                className="relative"
            >
                <FaBell className="text-red-500" size={32} />
                {dangerAlerts.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                        {dangerAlerts.length}
                    </span>
                )}

                {showAlerts && (
                    <div className="absolute top-0 left-8 w-64 bg-white shadow-lg rounded-lg p-4 z-50 border border-gray-200">
                        <h4 className="font-bold text-sm text-gray-700 mb-2">Alertes de Danger</h4>
                        {dangerAlerts.map((worker) => (
                            <div key={worker.id} className="mb-2 p-2 border-b border-gray-200">
                                <p className="text-sm font-bold">{worker.name}</p>
                                <p className="text-xs text-gray-600">{worker.location.address}</p>
                                <p className="text-xxs text-gray-500">
                                    {new Date(worker.alert.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex space-x-4">
                <div className="flex items-center space-x-1">
                    <span className="font-bold text-lg text-green-500">Connected</span> 
                    <span className="text-lg text-green-500">{statusCounts.connected}</span> 
                </div>
                <div className="flex items-center space-x-1">
                    <span className="font-bold text-lg text-gray-600">Disconnected</span>
                    <span className="text-sm text-gray-900">{statusCounts.disconnected}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <span className="font-bold text-lg text-yellow-500">Suspicious</span>
                    <span className="text-sm text-yellow-500">{statusCounts.suspicious}</span> 
                </div>
                <div className="flex items-center space-x-1">
                    <span className="font-bold text-lg text-red-500">In Danger</span>
                    <span className="text-sm text-red-500">{statusCounts.inDanger}</span> 
                </div>
            </div>
        </div>
    );
};

export default StatusOverview;
