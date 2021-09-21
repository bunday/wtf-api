const mongoose = require("mongoose");
const mongoUrl = process.env["MONGO_URL"];

mongoose
  .connect(mongoUrl)
  .then(() => {
    return console.log("Mongo connected");
  })
  .catch((err) => {
    // mongoose connection error will be handled here
    console.error("App starting error:", err.stack);
    process.exit(1);
  });

module.exports = mongoose;
