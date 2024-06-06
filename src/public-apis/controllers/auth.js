const _ = require('lodash');
const HttpError = require('standard-http-error');

const authService = require('../../services/auth');
const userService = require('../../services/user');

async function login(req, res) {
  const token = await authService.loginUser(req);
  if (!token) {
    throw new HttpError(
      'BAD_REQUEST',
      'Invalid combination of user and password'
    );
  }
  return res.json({ access_token: token });
}

async function register(req, res) {
  const user = await userService.registerUser(req.payload, req.di);
  const token = await authService.generateUserToken(
    user,
    authService.AUTH_KEYS.USER_REGISTRATION
  );
  return res.json({ token });
}

async function forgotPassword(req, res) {
  const user = await userService.findOne(req.di, req.payload);
  if (_.isEmpty(user)) {
    throw new HttpError('BAD_REQUEST');
  }
  const token = authService.generateUserToken(
    user,
    authService.AUTH_KEYS.USER_FORGOT
  );
  return res.json({ token });
}

async function resetPassword(req, res) {
  const token = req.params.token;
  const userData = await authService.decodeUserToken(
    token,
    authService.AUTH_KEYS.USER_FORGOT
  );
  if (_.isEmpty(userData)) {
    throw new HttpError('BAD_REQUEST');
  }
  await userService.changePassword(req.di, userData.id, req.payload.password);
  return res.json();
}

async function activateUser(req, res) {
  const token = req.params.token;
  const userData = await authService.decodeUserToken(
    token,
    authService.AUTH_KEYS.USER_REGISTRATION
  );
  if (_.isEmpty(userData)) {
    throw new HttpError('BAD_REQUEST');
  }
  await userService.activateUser(userData.id);
  return res.json();
}

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
  activateUser
};
