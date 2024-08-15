import React, { useState, useEffect } from 'react';
import { getSingleLogApi } from '../../apis/Api';

const LogDetails = ({ logId }) => {
    const [log, setLog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogDetails = async () => {
            try {
                const response = await getSingleLogApi(logId);
                setLog(response.data);
            } catch (error) {
                console.error('Failed to fetch log details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogDetails();
    }, [logId]);

    if (loading) {
        return <p>Loading details...</p>;
    }

    if (!log) {
        return <p>No details available.</p>;
    }

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Log Details</h3>
            <p><strong>User ID:</strong> {log.userId}</p>
            <p><strong>Method:</strong> {log.method}</p>
            <p><strong>URL:</strong> {log.url}</p>
            <p><strong>Action:</strong> {log.actionDescription}</p>
            <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
            <div className="mt-4">
                <h4 className="font-semibold">Headers:</h4>
                <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(log.headers, null, 2)}</pre>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold">Body:</h4>
                <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(log.body, null, 2)}</pre>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold">Query:</h4>
                <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(log.query, null, 2)}</pre>
            </div>
            <div className="mt-4">
                <h4 className="font-semibold">Params:</h4>
                <pre className="bg-gray-200 p-2 rounded">{JSON.stringify(log.params, null, 2)}</pre>
            </div>
        </div>
    );
};

export default LogDetails;