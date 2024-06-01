const {
  NotFoundError,
  OptimisticLockError,
  MetadataError,
  NotNullConstraintViolationException,
  UniqueConstraintViolationException,
  ForeignKeyConstraintViolationException,
  ConstraintViolationException,
  ValidationError,
  DriverException
} = require('@mikro-orm/core');
const HttpError = require('standard-http-error');

function databaseExceptionFilter(err, req, res, next) {
  // Handle different types of database exceptions
  if (err instanceof NotFoundError) {
    return next(new HttpError('NOT_FOUND'));
  }

  if (err instanceof OptimisticLockError) {
    return next(new HttpError('PRECONDITION_FAILED'));
  }

  if (err instanceof MetadataError) {
    return next(new HttpError('INTERNAL_SERVER_ERROR'));
  }

  if (err instanceof NotNullConstraintViolationException) {
    return next(new HttpError('BAD_REQUEST'));
  }

  if (
    err instanceof UniqueConstraintViolationException ||
    err instanceof ForeignKeyConstraintViolationException ||
    err instanceof ConstraintViolationException
  ) {
    return next(new HttpError('CONFLICT'));
  }

  if (err instanceof ValidationError) {
    return next(new HttpError('BAD_REQUEST'));
  }

  if (err instanceof DriverException) {
    return next(new HttpError('INTERNAL_SERVER_ERROR'));
  }

  // Pass the error to the next middleware if it's not a database exception
  next(err);
}

module.exports = databaseExceptionFilter;
