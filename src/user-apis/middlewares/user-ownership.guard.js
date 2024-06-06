const _ = require('lodash');
const HttpError = require('standard-http-error');

module.exports = (req, res, next) => {
  const user = req.user;
  if (_.isEmpty(user)) {
    throw new HttpError('UNAUTHORIZED');
  }
  const uid = req.params.uid;
  if (!_.isEmpty(uid) && user.id !== uid) {
    throw new HttpError('FORBIDDEN');
  }
  return next();
};
