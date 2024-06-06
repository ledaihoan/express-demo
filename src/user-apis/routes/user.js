const Joi = require('joi');

const { passwordValidationSchema } = require('../../constants/payload-schema');
const userController = require('../controllers/user.controller');
const pathPrefix = '/users';
const routes = [
  {
    method: 'get',
    path: '/:uid',
    handler: userController.getUserById
  },
  {
    method: 'put',
    path: '/:uid',
    handler: userController.updateUser,
    config: {
      payload: Joi.object()
        .keys({
          firstName: Joi.string().trim().max(50),
          lastName: Joi.string().trim().max(50)
        })
        .required()
        .min(1)
    }
  },
  {
    method: 'post',
    path: '/:uid/change-password',
    handler: userController.changePassword,
    config: {
      payload: Joi.object()
        .keys({
          password: passwordValidationSchema
        })
        .required()
        .min(1)
    }
  }
];

module.exports = {
  routes,
  pathPrefix
};
