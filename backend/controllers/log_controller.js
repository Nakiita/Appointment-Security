// controllers/logController.js

const Log = require('../model/logs');

// Get all logs
const getAllLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve logs', error: error.message });
    }
};

// Get a specific log by ID
const getLogById = async (req, res) => {
    const { id } = req.params;
    try {
        const log = await Log.findById(id);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve log', error: error.message });
    }
};

// Delete a specific log by ID
const deleteLogById = async (req, res) => {
    const { id } = req.params;
    try {
        const log = await Log.findByIdAndDelete(id);
        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }
        res.status(200).json({ message: 'Log deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete log', error: error.message });
    }
};


module.exports = {
    getAllLogs,
    getLogById,
    deleteLogById,
    
};
