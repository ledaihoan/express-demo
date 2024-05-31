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
const {
  BadRequestError,
  ConflictError,
  InternalServerError,
  PreconditionFailedError,
  NotFound
} = require('http-errors');

function databaseExceptionFilter(err, req, res, next) {
  // Handle different types of database exceptions
  if (err instanceof NotFoundError) {
    return next(new NotFound());
  }

  if (err instanceof OptimisticLockError) {
    return next(new PreconditionFailedError());
  }

  if (err instanceof MetadataError) {
    return next(new InternalServerError());
  }

  if (err instanceof NotNullConstraintViolationException) {
    return next(new BadRequestError());
  }

  if (
    err instanceof UniqueConstraintViolationException ||
    err instanceof ForeignKeyConstraintViolationException ||
    err instanceof ConstraintViolationException
  ) {
    return next(new ConflictError());
  }

  if (err instanceof ValidationError) {
    return next(new BadRequestError());
  }

  if (err instanceof DriverException) {
    return next(new InternalServerError());
  }

  // Pass the error to the next middleware if it's not a database exception
  next(err);
}

module.exports = databaseExceptionFilter;
