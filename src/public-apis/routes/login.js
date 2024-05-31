const loginController = require('../controllers/login');
const userController = require('../controllers/login');

const pathPrefix = '/';
const routes = [
  {
    method: 'post',
    path: '/login',
    handler: loginController.login,
    auth: false
  },
  {
    method: 'post',
    path: '/register',
    handler: loginController.register,
    auth: false
  },
  {
    method: 'post',
    path: '/forgot',
    handler: loginController.forgotPassword,
    auth: false
  },
  {
    method: 'post',
    path: '/reset-password',
    handler: loginController.resetPassword,
    auth: false
  },
  {
    method: 'post',
    path: '/activate/:token',
    handler: userController.activateUser,
    auth: false
  }
];
module.exports = {
  routes,
  pathPrefix
};
