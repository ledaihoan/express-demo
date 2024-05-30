const _ = require('lodash');

const userRoles = require('../constants/user-roles');

const jwt = require('./jwt');
const kms = require('./kms-simple');

const SUPER_USER_AUTH_KEY = 'SUPER_USER_AUTH';
const superUserData = {
  id: 'USER_0',
  role: userRoles.SYSTEM
};
function generateSuperUserToken(forceRotate = false) {
  kms.rotateToken(superUserData, SUPER_USER_AUTH_KEY, forceRotate);
}

function decodeSuperUserToken(token) {
  const { token: currentToken, secret } =
    kms.getCurrentToken(SUPER_USER_AUTH_KEY);
  const tokenSuperUserData = _.pick(jwt.decodeToken(token, secret), [
    'id',
    'role'
  ]);
  return currentToken &&
    currentToken === token &&
    _.isEqual(tokenSuperUserData, superUserData)
    ? tokenSuperUserData
    : null;
}

module.exports = {
  generateSuperUserToken,
  decodeSuperUserToken
};
