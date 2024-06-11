const _ = require('lodash');

const paginationUtils = require('../utils/pagination');
module.exports = function (params) {
  return (req, res, next) => {
    const pagination = {};
    const cursor = _.get(req, 'query._cursor');
    const sortBy = _.get(
      req,
      'query._sort',
      _.get(params, 'defaultSort', 'createdAt:asc')
    );
    const [sortField, sortOrder] = sortBy.split(':');
    if (cursor) {
      pagination.cursor = paginationUtils.parseCursor(cursor, req.user);
      pagination.sortField = sortField;
      pagination.sortOrder = sortOrder;
    }
    pagination.limit = _.get(req.query, '_limit') || 100;
    pagination.payload = paginationUtils.transformSearchPayload(
      req.body,
      _.get(params, 'fieldMaps')
    );
    req.paginationParams = pagination;
    next();
  };
};
