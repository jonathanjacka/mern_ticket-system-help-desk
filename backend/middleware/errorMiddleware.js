const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  const response = { success: 'false', message: error.message };

  process.env.NODE_ENV === 'development' && (response.stack = error.stack);

  res.json(response);
};

module.exports = errorHandler;
