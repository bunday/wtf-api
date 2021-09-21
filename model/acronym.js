const mongoose = require("../config/db");

const Schema = mongoose.Schema;
const acronymSchema = new Schema({
  title: String,
  meaning: String,
  deleted: { type: Boolean, default: false },
  deletedAt: Date,
  deletedById: { type: String, ref: "User", index: true },
});
module.exports = mongoose.model("Acronym", acronymSchema);
