module.exports = {
  create: async function (data) {
    try {
      const userModel = new UserModel();
      userModel.username = data.username;
      userModel.password = await bcrypt.hash(data.password, 10);

      const user = await userModel.save();
      return user;
    } catch (error) {
      throw error;
    }
  },
  async findOneBy(query) {
    try {
      if (!query) {
        query = {};
      }

      if (!query.deleted) query.deleted = false;
      const user = await UserModel.findOne(query);
      return user;
    } catch (error) {
      throw error;
    }
  },
  generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN_SECRET);
  },
  async validateCredentials(password, hashPassword) {
    try {
      const res = await bcrypt.compare(password, hashPassword);
      return res;
    } catch (error) {
      throw error;
    }
  },
};

const UserModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
