// routes/logRoutes.js

const express = require('express');
const router = express.Router();
const logController = require('../controllers/log_controller.js');

// Route to get all logs
router.get('/logs', logController.getAllLogs);

// Route to get a specific log by ID
router.get('/logs/:id', logController.getLogById);

// Route to delete a specific log by ID
router.delete('/logs/:id', logController.deleteLogById);

module.exports = router;
