const response = (res, status, data = {}, error = "") => {
  return res.status(status).json({
    result: data,
    error: error,
  });
};

module.exports = response;
