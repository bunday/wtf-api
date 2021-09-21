const response = {
  sendErrorResponse: function (req, res, error) {
    error.code = error.code || 500;
    return res
      .status(error.code)
      .send({ message: error.message, status: error.code });
  },

  sendSuccessResponse: function (req, res, data, message) {
    return res.status(200).send({ message, data, status: 200 });
  },
};

module.exports = response;
