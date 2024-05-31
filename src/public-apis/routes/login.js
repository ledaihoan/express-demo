const Joi = require('joi');

const loginController = require('../controllers/login');
const userController = require('../controllers/login');

const pathPrefix = '/';
const routes = [
  {
    method: 'post',
    path: '/login',
    handler: loginController.login,
    config: {
      auth: false,
      payload: Joi.object()
        .keys({
          email: Joi.string().email(),
          username: Joi.string().trim(),
          password: Joi.string().trim().required()
        })
        .xor('email', 'username')
        .required()
    }
  },
  {
    method: 'post',
    path: '/register',
    handler: loginController.register,
    config: {
      auth: false
    }
  },
  {
    method: 'post',
    path: '/forgot',
    handler: loginController.forgotPassword,
    config: {
      auth: false
    }
  },
  {
    method: 'post',
    path: '/reset-password',
    handler: loginController.resetPassword,
    config: {
      auth: false
    }
  },
  {
    method: 'post',
    path: '/activate/:token',
    handler: userController.activateUser,
    config: {
      auth: false
    }
  }
];
module.exports = {
  routes,
  pathPrefix
};
