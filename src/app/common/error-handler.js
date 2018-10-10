const httpStatus = require('http-status-codes');

function errorHandler(error, ctx) {
  ctx.body = {
    errors: error.errors,
  }

  ctx.status = httpStatus.BAD_REQUEST;
}

module.exports = errorHandler;
