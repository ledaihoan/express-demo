const express = require('express');
const moduleRouter = express.Router();

const routeUtil = require('../../utils/route');
const superUserAuthGuard = require('../middlewares/super-user-auth.guard');

const userRouter = require('./user');

const enabledRouters = [userRouter];

for (const routerDef of enabledRouters) {
  const { pathPrefix, routes } = routerDef;
  const router = express.Router();
  routeUtil.bindingRoutes(router, routes, [superUserAuthGuard]);
  moduleRouter.use(pathPrefix, router);
}
module.exports = moduleRouter;
