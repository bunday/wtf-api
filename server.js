const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { NODE_ENV } = process.env;

if (!NODE_ENV || NODE_ENV === "development") {
  require("custom-env").env();
}
process.on("exit", () => {
  console.log("Server Shutting Shutdown");
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception in server process occurred");
  console.error(err);
});

const http = require("http").createServer(app);

app.use(cors());

app.set("port", process.env.PORT || 8080);

const server = http.listen(app.get("port"), function () {
  console.log("Server Started on port " + app.get("port"));
});

// parse the body to json
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get(["/", "/api"], function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      status: 200,
      message: "Service Status - OK",
      serviceType: "wtf-api",
    })
  );
});

const mongoose = require('./config/db');

module.exports.close = function () {
  server.close();
};
