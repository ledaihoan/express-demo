const Joi = require('joi');

const userController = require('../controllers/user.controller');
const pathPrefix = '/users';
const routes = [
  {
    method: 'get',
    path: '/:id',
    handler: userController.getUserById
  },
  {
    method: 'put',
    path: '/:id',
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
    path: '/:id/change-password',
    handler: userController.changePassword
  }
];

module.exports = {
  routes,
  pathPrefix
};
