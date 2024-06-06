const Joi = require('joi');

const authController = require('../controllers/auth');

const pathPrefix = '/';
const routes = [
  {
    method: 'post',
    path: '/login',
    handler: authController.login,
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
    handler: authController.register,
    config: {
      auth: false,
      payload: Joi.object()
        .keys({
          email: Joi.string().email().required(),
          username: Joi.string().trim().default(Joi.ref('email')),
          password: Joi.string().trim().required(),
          firstName: Joi.string().trim().max(50).required(),
          lastName: Joi.string().trim().max(50).required()
        })
        .required()
    }
  },
  {
    method: 'post',
    path: '/forgot',
    handler: authController.forgotPassword,
    config: {
      auth: false,
      payload: Joi.object()
        .keys({
          email: Joi.string().email(),
          username: Joi.string().trim()
        })
        .xor('email', 'username')
        .required()
    }
  },
  {
    method: 'post',
    path: '/reset-password/:token',
    handler: authController.resetPassword,
    config: {
      auth: false,
      payload: Joi.object()
        .keys({
          password: Joi.string().trim().required()
        })
        .xor('email', 'username')
        .required()
    }
  },
  {
    method: 'post',
    path: '/activate/:token',
    handler: authController.activateUser,
    config: {
      auth: false
    }
  }
];
module.exports = {
  routes,
  pathPrefix
};
