const jwt = require("jsonwebtoken");
const sendErrorResponse = require("../service/responseService").sendErrorResponse

module.exports = {
  isTokenValid: function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return sendErrorResponse(req, res, {code: 401, message: "Unauthorized"})

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err);

      if (err) return sendErrorResponse(req, res, {code: 403, message: "Forbidden"})

      req.user = user;

      next();
    });
  },
};
