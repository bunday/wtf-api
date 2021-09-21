const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
});
module.exports = mongoose.model("User", userSchema);
