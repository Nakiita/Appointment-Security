import React, { useState } from 'react';
import { deleteLogApi } from '../../apis/Api';
import LogList from './LogList';
import LogDetails from './LogDetails';
import Sidebar from "../../components/Sidebar";

const LogDashboard = () => {
    const [selectedLogId, setSelectedLogId] = useState(null);

    const handleSelectLog = (logId) => {
        setSelectedLogId(logId);
    };

    const handleDeleteLog = async (logId) => {
        try {
            await deleteLogApi(logId);
            setSelectedLogId(null);  // Clear selection after deletion
            alert('Log deleted successfully');
        } catch (error) {
            console.error('Failed to delete log', error);
        }
    };

    return (
        <div className="flex">
            <Sidebar className="w-1/4" />
            <div className="flex-1 p-6">
                <h3 className="text-2xl font-semibold mb-2">Logs</h3>
                <p className="text-gray-600">Manage the list of logs.</p>
                <LogList onSelectLog={handleSelectLog} onDeleteLog={handleDeleteLog} />
                {selectedLogId && <LogDetails logId={selectedLogId} />}
            </div>
        </div>
    );
};

export default LogDashboard;
