const _ = require('lodash');
const HttpError = require('standard-http-error');

function httpExceptionFilter(err, req, res, next) {
  if (err instanceof HttpError) {
    res
      .status(_.get(err, 'status', 500))
      .json({ message: _.get(err, 'message', 'unknown error') });
  }
  next(err);
}

module.exports = httpExceptionFilter;
