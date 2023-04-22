const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors');

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong',
  };
  // if (err instanceof CustomError) {
  // return res.status(err.statusCode).json({ msg: err.message });
  // }

  // Duplication error - using same email to register twice
  if (err && err.code === 11000) {
    customError.statusCode = 400;
    customError.message = `Duplicate value for ${Object.keys(
      err.keyValue
    )} field, please choose another one`;
  }

  // Validation Error  - custom error if user or job is missing a field
  if (err.name === 'ValidationError') {
    customError.statusCode = 400;
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');
  }

  // Cast Error- invalid id passed to route
  if (err.name === 'CastError') {
    customError.statusCode = 404;
    customError.message = `No item found with id ${err.value}`;
  }
  res.status(customError.statusCode).json({ msg: customError.message });
  // res.status(customError.statusCode).json({ err });
};

module.exports = errorHandlerMiddleware;
