const logger = require('../logger');
const Log = require('../model/logs');

const logRequests = async (req, res, next) => {
    const { method, url, body, query, params } = req;
    const userId = req.session?.userId || 'Anonymous';

    // Create a descriptive log message
    let actionDescription;

    if (url.includes('/register')) {
        actionDescription = `User ${userId} attempted to register with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/login')) {
        actionDescription = `User ${userId} attempted to log in`;
    } else if (url.includes('/logout')) {
        actionDescription = `User ${userId} logged out`;
    } else if (url.includes('/forgot/password')) {
        actionDescription = `User ${userId} requested a password reset with email: ${body.email}`;
    } else if (url.includes('/password/reset')) {
        actionDescription = `User ${userId} attempted to reset their password using token: ${params.token}`;
    } else if (url.includes('/getUsers')) {
        actionDescription = `User ${userId} requested a list of users`;
    } else if (url.includes('/getUser')) {
        actionDescription = `User ${userId} requested details for user ID: ${params.id}`;
    } else if (url.includes('/deleteUser')) {
        actionDescription = `User ${userId} attempted to delete user ID: ${params.id}`;
    } else if (url.includes('/update_user')) {
        actionDescription = `User ${userId} attempted to update user ID: ${params.id} with data: ${JSON.stringify(body)}`;
    } else if (url.includes('/getPagination')) {
        actionDescription = `User ${userId} requested paginated users with query: ${JSON.stringify(query)}`;
    } else {
        actionDescription = `User ${userId} made a ${method} request to ${url} with body: ${JSON.stringify(body)}`;
    }

    // Save the log to the database
    try {
        await Log.create({
            userId,
            method,
            url,
            headers: req.headers,
            body,
            query,
            params,
            actionDescription
        });
        console.log('Log saved to database');
    } catch (error) {
        logger.error(`Failed to save log to database: ${error.message}`);
    }

    next();
};

module.exports = logRequests;
