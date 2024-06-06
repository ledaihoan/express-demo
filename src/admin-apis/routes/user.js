const Joi = require('joi');

const authRoles = require('../../constants/auth-roles');
const { passwordValidationSchema } = require('../../constants/payload-schema');
const userController = require('../controllers/user.controller');

const pathPrefix = '/users';
const routes = [
  {
    method: 'post',
    path: '/search',
    handler: userController.searchUsers
  },
  {
    method: 'post',
    path: '/',
    handler: userController.createUser,
    config: {
      payload: Joi.object()
        .keys({
          email: Joi.string().email().required(),
          firstName: Joi.string().trim().max(50).required(),
          lastName: Joi.string().trim().max(50).required(),
          username: Joi.string().trim().default(Joi.ref('email')),
          password: passwordValidationSchema,
          isActive: Joi.boolean().default(false),
          role: Joi.string().valid(authRoles.USER).default(authRoles.USER)
        })
        .required()
    }
  },
  {
    method: 'post',
    path: '/register',
    handler: userController.registerUser
  },
  {
    method: 'get',
    path: '/:id',
    handler: userController.getUserById
  },
  {
    method: 'put',
    path: '/:id',
    handler: userController.updateUser
  },
  {
    method: 'delete',
    path: '/:id',
    handler: userController.deleteUser
  },
  {
    method: 'post',
    path: '/:id/activate',
    handler: userController.activateUser
  }
];

module.exports = {
  routes,
  pathPrefix
};
