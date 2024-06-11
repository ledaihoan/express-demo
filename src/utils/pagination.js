const _ = require('lodash');
const HttpError = require('standard-http-error');

const { encodeBase64, decodeBase64 } = require('./string');
function buildCursor(payload) {
  const str = JSON.stringify(payload);
  return encodeBase64(str);
}
function parseCursor(cursor, actorUser = null) {
  if (_.isEmpty(cursor)) return null;
  let cursorObj;
  let isValid = true;
  try {
    const str = decodeBase64(cursor);
    cursorObj = JSON.parse(str);
    if (actorUser) {
      const uid = _.get(actorUser, 'id');
      const cursorUid = _.get(cursorObj, 'uid');
      if (uid !== cursorUid) {
        isValid = false;
      }
    }
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
  } catch {
    isValid = false;
  }
  if (!isValid) {
    throw new HttpError('BAD_REQUEST', 'Invalid cursor');
  }
  return cursorObj;
}
function transformSearchPayload(originPayload, fieldsArray = null) {
  const transformedPayload = {};

  fieldsArray.forEach((mapping) => {
    _.forOwn(mapping, (newKey, oldKey) => {
      if (originPayload[oldKey] !== undefined) {
        transformedPayload[newKey] = { $in: originPayload[oldKey] };
      }
    });
  });

  return transformedPayload;
}

function paginatedResponse(items, paginationParams, actorUser = null) {
  const { limit, sortField } = paginationParams;
  const pagination = { nextCursor: null };
  if (_.size(items) > limit) {
    const lastItem = items[limit - 1];
    const cursorPayload = { [sortField]: _.get(lastItem, sortField) };
    if (actorUser) {
      cursorPayload.uid = actorUser.id;
    }
    pagination.nextCursor = buildCursor(cursorPayload);
  }
  return { results: items.slice(0, limit), pagination };
}
module.exports = {
  buildCursor,
  parseCursor,
  transformSearchPayload,
  paginatedResponse
};
