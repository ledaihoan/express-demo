const _ = require('lodash');

const asyncHandler = require('../middlewares/async.handler');
const paginationPipeMiddleware = require('../middlewares/pagination.pipe');
const payloadValidationMiddleware = require('../middlewares/payload.validator');
const queryValidationMiddleware = require('../middlewares/query.validator');

function isAsyncFunction(func) {
  if (typeof func !== 'function') {
    return false;
  }
  return func.constructor.name === 'AsyncFunction';
}
function bindingRoutes(router, routes, authMiddlewares = []) {
  if (Array.isArray(routes)) {
    for (const route of routes) {
      const { method, path, handler, config } = route;
      const auth = _.get(config, 'auth');
      const payloadSchema = _.get(config, 'payload');
      const querySchema = _.get(config, 'query');
      const paginationConfig = _.get(config, 'pagination');
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
      if (!_.isEmpty(payloadSchema)) {
        handlers.push(payloadValidationMiddleware(payloadSchema));
      }
      if (!_.isEmpty(querySchema)) {
        handlers.push(queryValidationMiddleware(querySchema));
      }
      if (!_.isEmpty(paginationConfig)) {
        handlers.push(paginationPipeMiddleware(paginationConfig));
      }
      const routeHandler = isAsyncFunction(handler)
        ? asyncHandler(handler)
        : handler;
      handlers.push(routeHandler);
      router[method](path, ...handlers);
    }
  }
}

module.exports = { bindingRoutes };
