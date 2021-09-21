module.exports = {
  create: async function (data) {
    try {
      const acronymModel = new AcronymModel();
      acronymModel.title = data.title;
      acronymModel.meaning = data.meaning;

      const acronym = await acronymModel.save();
      return acronym;
    } catch (error) {
      throw error;
    }
  },
  //Description: Gets all acronym by query.
  async findBy({ query, limit, skip}) {
    try {
      if (!skip) skip = 0;

      if (!limit) limit = 0;

      if (typeof skip === "string") {
        skip = parseInt(skip);
      }

      if (typeof limit === "string") {
        limit = parseInt(limit);
      }

      if (!query) {
        query = {};
      }

      if (!query.deleted) query.deleted = false;

      let acronyms = AcronymModel.find(query)
        .lean()
        .sort([["createdAt", -1]])
        .limit(limit)
        .skip(skip);

      
      return acronyms;
    } catch (error) {
      throw error;
    }
  },
  async findOneBy( query ) {
    try {
      if (!query) {
        query = {};
      }

      if (!query.deleted) query.deleted = false;
      const acronym = await AcronymModel.findOne(query);
      return acronym;
    } catch (error) {
      throw error;
    }
  },
};

const AcronymModel = require("../model/acronym");
