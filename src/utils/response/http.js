const successResponse = (statusCode, message, data = null) => {
  return {
    success: true,
    status: statusCode,
    message: message,
    data: data,
  };
};

module.exports = { successResponse };
