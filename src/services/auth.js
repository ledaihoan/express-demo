const fs = require('fs');

const _ = require('lodash');

const authRoles = require('../constants/auth-roles');
const jwt = require('../utils/jwt');
const kms = require('../utils/kms-simple');

const encryptionService = require('./encryption');
const userService = require('./user');

const SUPER_USER_AUTH_KEY = 'SUPER_USER_AUTH';
const superUserData = {
  id: 'USER_0',
  role: authRoles.SYSTEM
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
  if (_.isEmpty(tokenSuperUserData)) {
    generateSuperUserToken();
  }
  return currentToken &&
    currentToken === token &&
    _.isEqual(tokenSuperUserData, superUserData)
    ? tokenSuperUserData
    : null;
}

function decodeUserToken(token) {
  const secret = fs.readFileSync(process.env.USER_SECRET_FILE);
  return jwt.decodeToken(token, secret);
}

function generateUserToken(user) {
  const secret = fs.readFileSync(process.env.USER_SECRET_FILE);
  return jwt.generateToken(
    _.pick(user, ['id', 'role']),
    secret,
    +process.env.AUTH_TOKEN_EXPIRE_MINUTES || 60
  );
}

async function loginUser(req) {
  const { username, email, password } = req.body;
  const findUserDto = _.omitBy({ username, email }, _.isEmpty);
  let valid = false;
  const user = await userService.findOne(req.di, findUserDto);
  if (user) {
    valid = await encryptionService.comparePassword(password, user.password);
  }
  return valid ? generateUserToken(user) : null;
}

module.exports = {
  generateSuperUserToken,
  decodeSuperUserToken,
  decodeUserToken,
  loginUser
};
