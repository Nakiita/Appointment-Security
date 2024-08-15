import React, { useState, useEffect } from 'react';
import { getAllLogsApi } from '../../apis/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import LogDetails from './LogDetails';

const LogList = ({ onSelectLog, onDeleteLog }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLogId, setSelectedLogId] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await getAllLogsApi();
                setLogs(response.data);
            } catch (error) {
                console.error('Failed to fetch logs', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const toggleLogDetails = (logId) => {
        setSelectedLogId(selectedLogId === logId ? null : logId);
        onSelectLog(selectedLogId === logId ? null : logId);
    };

    if (loading) {
        return <p>Loading logs...</p>;
    }

    return (
        <div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Name</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {logs.map((log, index) => (
                            <tr key={log._id} className="border-b">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.actionDescription.length > 60 ? `${log.actionDescription.substring(0, 60)}...` : log.actionDescription}
                                    {selectedLogId === log._id && (
                                        <div className="mt-4 bg-gray-100 p-4 rounded">
                                            <LogDetails logId={selectedLogId} />
                                        </div>
                                    )}
                                </td>

                                <td className=" whitespace-nowrap text-right text-sm font-medium">

                                    <button
                                        onClick={() => toggleLogDetails(log._id)}
                                        className="text-blue-500 hover:text-blue-700 mr-5"
                                    >
                                        <FontAwesomeIcon icon={faEye} /> 
                                    </button>
                                    <button
                                        onClick={() => onDeleteLog(log._id)}
                                        className="text-red-500 hover:text-red-700 ml-5 mr-3"
                                    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default LogList;
