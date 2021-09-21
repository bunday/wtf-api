const express = require("express");
const router = express.Router();

// Description: Add a New Acronym
// req.body -> {title, meaning}
// Returns: response status, error message
router.post("/", async function (req, res) {
  try {
    const data = req.body;

    if (!data.title) {
      return sendErrorResponse(req, res, {
        code: 400,
        message: "Title is required.",
      });
    }

    if (!data.meaning) {
      return sendErrorResponse(req, res, {
        code: 400,
        message: "Meaning is required.",
      });
    }

    // confirm that the title doesnt exist already

    // TODO all checks are fine, now we save to the db
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
});
