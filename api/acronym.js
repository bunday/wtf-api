const express = require("express");
const router = express.Router();
const AcronymService = require("../service/acronymService");
const sendErrorResponse =
  require("../service/responseService").sendErrorResponse;
const sendSuccessResponse =
  require("../service/responseService").sendSuccessResponse;
const fs = require("fs");

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
    const existingAcronym = await AcronymService.findOneBy({
      title: data.title,
    });
    if (existingAcronym) {
      return sendErrorResponse(req, res, {
        code: 400,
        message: "Acronym already exist.",
      });
    }

    // all checks are fine, now we save to the db
    const acronym = await AcronymService.create(data);
    return sendSuccessResponse(
      req,
      res,
      acronym,
      "Acronym Created Successfully"
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
});

router.get("/", async function (req, res) {
  try {

    // get the 3 query params and take care of default values
    const limit = req.query.limit || 10;
    const from = req.query.from || 0;
    const search = req.query.search || "";
    const acronyms = await AcronymService.findBy(
      { title: { $regex: search, $options: "i" } },
      limit,
      from
    );
    return sendSuccessResponse(
      req,
      res,
      acronyms,
      "Acronym Fetched Successfully"
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
});

router.get("/upload", async function (req, res) {
  try {
    // read the existing config file
    const rawdata = fs.readFileSync("./config/acronym.json");
    const acronyms = JSON.parse(rawdata);
    uploadedAcronym = 0;
    // loop through each acronym
    acronyms.forEach(async (acronym) => {
      // get the key and value pair
      const key = Object.keys(acronym)[0];
      const value = acronym[key];

      // confirm that the title doesnt exist already
      const existingAcronym = await AcronymService.findOneBy({
        title: key,
      });
      if (!existingAcronym) {
        // create acronym
        await AcronymService.create({ title: key, meaning: value });
        uploadedAcronym = uploadedAcronym + 1;
      }
    });

    // inform user how many was uploaded
    return sendSuccessResponse(
      req,
      res,
      {},
      `${acronyms.length} Acronym${
        uploadedAcronym.length > 1 ? "s" : ""
      } processed Successfully`
    );
  } catch (error) {
    throw error;
    return sendErrorResponse(req, res, error);
  }
});

module.exports = router;
