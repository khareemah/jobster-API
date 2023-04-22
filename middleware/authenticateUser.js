const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');
const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthenticatedError('Authentication Invalid');
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to jobs controller
    const testUser = decoded.userId === '6440e324c7b898f45e90e38d';

    req.user = { userId: decoded.userId, name: decoded.name, testUser };

    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid');
  }
};
module.exports = authenticateUser;
