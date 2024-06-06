const _ = require('lodash');

const authRoles = require('../../constants/auth-roles');
const authService = require('../../services/auth');
module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization || '';
  const token = tokenHeader.split(' ')[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = authService.decodeUserToken(token);
    if (_.isEmpty(decoded) || decoded.role !== authRoles.USER) {
      throw new Error();
    }
    req.user = decoded; // You can attach the decoded user information to the request object if needed
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
