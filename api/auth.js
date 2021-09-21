const express = require("express");
const router = express.Router();
const UserService = require("../service/userService");
const sendErrorResponse =
  require("../service/responseService").sendErrorResponse;
const sendSuccessResponse =
  require("../service/responseService").sendSuccessResponse;

router.post("/register", async function (req, res) {
  try {
    const data = req.body;

    if (!data.username) {
      return sendErrorResponse(req, res, {
        code: 400,
        message: "Username is required.",
      });
    }

    if (!data.password) {
      return sendErrorResponse(req, res, {
        code: 400,
        message: "Password is required.",
      });
    }

    if (!data.confirm_password) {
      return sendErrorResponse(req, res, {
        code: 400,
        message: "Confirm Password is required.",
      });
    }

    if (data.password != data.confirm_password) {
      return sendErrorResponse(req, res, {
        code: 400,
        message: "Password does not match.",
      });
    }

    // confirm that the username doesnt exist already
    const existingUser = await UserService.findOneBy({
      username: data.username,
    });
    if (existingUser) {
      return sendErrorResponse(req, res, {
        code: 400,
        message: "Username is taken.",
      });
    }


    // all checks are fine, now we save to the db
    const user = await UserService.create(data);
    // generate token for user
    const userDto = {token: UserService.generateAccessToken(user.username)}

    return sendSuccessResponse(
      req,
      res,
      userDto,
      "User Created Successfully"
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
});

router.post("/login", async function (req, res) {
    try {
      const data = req.body;
  
      if (!data.username) {
        return sendErrorResponse(req, res, {
          code: 400,
          message: "Username is required.",
        });
      }
  
      if (!data.password) {
        return sendErrorResponse(req, res, {
          code: 400,
          message: "Password is required.",
        });
      }
  
      // confirm that the username doesnt exist already
      const existingUser = await UserService.findOneBy({
        username: data.username,
      });
      if (!existingUser) {
        return sendErrorResponse(req, res, {
          code: 400,
          message: "User does not exist.",
        });
      }
  
  
      // all checks are fine, validate password
      const passwordValid = await UserService.validateCredentials(data.password, existingUser.password);

      if (!passwordValid) {
        return sendErrorResponse(req, res, {
          code: 400,
          message: "Invalid credentials.",
        });
      }
      // generate token for user
      const userDto = {token: UserService.generateAccessToken(existingUser.username)}
  
      return sendSuccessResponse(
        req,
        res,
        userDto,
        "Login Successful"
      );
    } catch (error) {
      return sendErrorResponse(req, res, error);
    }
  });


module.exports = router;