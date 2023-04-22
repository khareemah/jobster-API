const notFoundMiddleware = (req, res) =>
  res.status(404).send('Resource not found');

module.exports = notFoundMiddleware;
