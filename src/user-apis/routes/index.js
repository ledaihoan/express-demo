const express = require('express');
const moduleRouter = express.Router();

const routeUtil = require('../../utils/route');
const userAuthGuard = require('../middlewares/user-auth.guard');
const userOwnershipGuard = require('../middlewares/user-ownership.guard');

const userRouter = require('./user');

const enabledRouters = [userRouter];

for (const routerDef of enabledRouters) {
  const { pathPrefix, routes } = routerDef;
  const router = express.Router();
  routeUtil.bindingRoutes(router, routes, [userAuthGuard, userOwnershipGuard]);
  moduleRouter.use(pathPrefix, router);
}
module.exports = moduleRouter;
