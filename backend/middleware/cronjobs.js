
const cron = require('node-cron');
const { notifyPasswordExpiry } = require('../controllers/user_controller');


const CRON_SCHEDULE = process.env.PASSWORD_EXPIRY_CRON || '0 0 * * *';

const setupCronJobs = () => {
    cron.schedule(CRON_SCHEDULE, () => {
        notifyPasswordExpiry();
    }, {
        scheduled: true,
        timezone: "America/New_York"
    });
};

module.exports = { setupCronJobs };
