const jwt = require('jsonwebtoken');
 
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', 
  });
  return token;
};

const sessionCheckMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, message: 'Session expired. Please log in again.' });
  }
  next();
};
module.exports = generateToken;
 
 