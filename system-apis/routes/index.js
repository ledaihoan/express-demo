const express = require('express');
const moduleRouter = express.Router();

const superUserAuthGuard = require('../middlewares/super-user-auth.guard');

const userRouter = require('./user');

const enabledRouters = [userRouter];

function bindingRoutes(router, routes) {
  if (Array.isArray(routes)) {
    for (const route of routes) {
      const { method, path, handler, auth } = route;
      if (auth === false) {
        router[method](path, handler);
      } else {
        router[method](path, handler, superUserAuthGuard);
      }
    }
  }
}
for (const routerDef of enabledRouters) {
  const { pathPrefix, routes } = routerDef;
  const router = express.Router();
  bindingRoutes(router, routes);
  moduleRouter.use(pathPrefix, router);
}
module.exports = moduleRouter;
