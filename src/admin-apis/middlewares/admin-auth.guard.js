const _ = require('lodash');

const { ADMIN } = require('../../constants/auth-roles');
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
    const user = authService.decodeUserToken(token);
    if (_.isEmpty(user)) {
      throw new Error('Invalid token');
    }
    const role = _.get(user, 'role');
    if (role !== ADMIN) {
      return res.status(403).json({ message: 'Invalid credential' });
    }
    req.user = user; // You can attach the decoded user information to the request object if needed
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
