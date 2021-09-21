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
