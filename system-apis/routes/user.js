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
    handler: userController.createUser
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
  }
];

module.exports = {
  routes,
  pathPrefix
};
