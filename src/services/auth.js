const fs = require('fs');

const _ = require('lodash');

const authRoles = require('../constants/auth-roles');
const jwt = require('../utils/jwt');
const kms = require('../utils/kms-simple');
const { rotateToken, rotateSecret } = require('../utils/kms-simple');

const encryptionService = require('./encryption');
const userService = require('./user');

const SUPER_USER_AUTH_KEYS = 'SUPER_USER_AUTH_KEYS';
const AUTH_KEYS = {
  USER: 'USER_AUTH_KEY',
  USER_REGISTRATION: 'USER_REGISTRATION_KEY',
  USER_FORGOT: 'USER_FORGOT_KEY'
};
const superUserData = {
  id: 'USER_0',
  role: authRoles.SYSTEM
};
const defaultTokenExpireMinutes = +process.env.AUTH_TOKEN_EXPIRE_MINUTES || 60;
function rotateAuthTokens(forceRotate = false) {
  return Promise.all([
    rotateSuperUserToken(forceRotate),
    ...AUTH_KEYS.map((key) => rotateUserSecret(key))
  ]);
}

function rotateSuperUserToken(includeSecret = false, forceRotate = false) {
  return rotateToken(
    superUserData,
    AUTH_KEYS.SUPER_USER,
    includeSecret,
    forceRotate
  );
}

function rotateUserSecret() {
  return rotateSecret(AUTH_KEYS.USER);
}

function decodeSuperUserToken(token) {
  const { token: currentToken, secret } = kms.getCurrentToken(
    AUTH_KEYS.SUPER_USER
  );
  const tokenSuperUserData = _.pick(jwt.decodeToken(token, secret), [
    'id',
    'role'
  ]);
  if (_.isEmpty(tokenSuperUserData)) {
    rotateSuperUserToken();
  }
  return currentToken &&
    currentToken === token &&
    _.isEqual(tokenSuperUserData, superUserData)
    ? tokenSuperUserData
    : null;
}

function decodeUserToken(token, key = AUTH_KEYS.USER) {
  const secretPath = `${process.env.USER_SECRET_PATH}`;
  const secretFile = fs.readFileSync(`${secretPath}/${key}.secret`);
  const secret = fs.readFileSync(secretFile);
  return jwt.decodeToken(token, secret);
}

function generateUserToken(
  user,
  key = AUTH_KEYS.USER,
  expireMinutes = defaultTokenExpireMinutes
) {
  const secretPath = `${process.env.USER_SECRET_PATH}`;
  const secretFile = fs.readFileSync(`${secretPath}/${key}.secret`);
  const secret = fs.readFileSync(secretFile);
  return jwt.generateToken(_.pick(user, ['id', 'role']), secret, expireMinutes);
}

async function loginUser(req) {
  const { username, email, password } = req.body;
  const findUserDto = _.omitBy({ username, email }, _.isEmpty);
  let valid = false;
  const user = await userService.findOne(req.di, findUserDto);
  if (user) {
    valid = await encryptionService.comparePassword(password, user.password);
  }
  if (!valid) {
    return null;
  }
  return generateUserToken(user);
}
module.exports = {
  AUTH_KEYS,
  SUPER_USER_AUTH_KEYS,
  loginUser,
  decodeSuperUserToken,
  decodeUserToken,
  generateUserToken,
  rotateAuthTokens
};
