const _ = require('lodash');

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
    const decoded = authService.decodeSuperUserToken(token);
    if (_.isEmpty(decoded)) {
      throw new Error('Invalid token');
    }
    req.user = decoded; // You can attach the decoded user information to the request object if needed
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};
