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

router.get("/upload", async function (req, res) {
  try {
    // read the existing config file
    const rawdata = fs.readFileSync("./config/acronym.json");
    const acronyms = JSON.parse(rawdata);
    uploadedAcronym = 0;
    // loop through each acronym
    acronyms.forEach(async (acronym) => {
      for (const key in acronym) {
        // get the key and value pair
        if (Object.hasOwnProperty.call(acronym, key)) {
          const meaning = acronym[key];

          // confirm that the title doesnt exist already
          const existingAcronym = await AcronymService.findOneBy({
            title: key,
          });
          if (!existingAcronym) {
            // create and increment number of uploaded
            await AcronymService.create({ title: key, meaning });
            uploadedAcronym++;
          }
        }
      }
    });
    // inform user how many was uploaded
    return sendSuccessResponse(
      req,
      res,
      {},
      `${uploadedAcronym} Acronym${
        uploadedAcronym > 1 ? "s" : ""
      } Uploaded Successfully`
    );
  } catch (error) {
    return sendErrorResponse(req, res, error);
  }
});

module.exports = router;
