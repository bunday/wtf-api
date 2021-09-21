module.exports = {
  async findOneBy({ query }) {
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
