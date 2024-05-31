const loginController = require('../controllers/login');

const pathPrefix = '/';
const routes = [
  {
    method: 'get',
    path: '/login',
    handler: loginController.login
  }
];
module.exports = {
  routes,
  pathPrefix
};
