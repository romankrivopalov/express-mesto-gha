const NotFoundError = require('./400-not-found');
const ForbiddenError = require('./403-forbidden');
const BadRequestError = require('./404-bad-request');
const ConflictError = require('./409-conflict');

module.exports = {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  ConflictError,
};
