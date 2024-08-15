
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    userId: { type: String, default: 'Anonymous' },
    method: { type: String, required: true },
    url: { type: String, required: true },
    headers: { type: Object, required: true },
    body: { type: Object, required: true },
    query: { type: Object, required: true },
    params: { type: Object, required: true },
    actionDescription: { type: String, required: true },  // New field for descriptive logs
    timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Log', logSchema);
