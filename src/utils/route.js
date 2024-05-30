const _ = require('lodash');

const payloadValidationMiddleware = require('../middlewares/payload.validator');
function bindingRoutes(router, routes, authMiddlewares = []) {
  if (Array.isArray(routes)) {
    for (const route of routes) {
      const { method, path, handler, config } = route;
      const auth = _.get(config, 'auth');
      const payloadSchema = _.get(config, 'payload');
      const handlers = [];
      if (auth !== false) {
        if (!_.isEmpty(authMiddlewares)) {
          handlers.push(...authMiddlewares);
        }
        // additional auth middleware like authorization
        const authHandlers = _.get(auth, 'handlers', []);
        if (!_.isEmpty(authHandlers)) {
          handlers.push(...authHandlers);
        }
      }
      if (_.isEmpty(payloadSchema)) {
        handlers.push(payloadValidationMiddleware(payloadSchema));
      }
      handlers.push(handler);
      router[method](path, ...handlers);
    }
  }
}

module.exports = { bindingRoutes };
