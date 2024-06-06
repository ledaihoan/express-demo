const express = require('express');
const moduleRouter = express.Router();

const routeUtil = require('../../utils/route');

const authRouter = require('./auth');

const enabledRouters = [authRouter];

for (const routerDef of enabledRouters) {
  const { pathPrefix, routes } = routerDef;
  const router = express.Router();
  routeUtil.bindingRoutes(router, routes, []);
  moduleRouter.use(pathPrefix, router);
}
module.exports = moduleRouter;
