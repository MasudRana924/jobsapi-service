const TimeModel = require("../models/time.js");
const { errorResponseHandler } = require("../helper/errorrResponseHandler.js");
const createNewTime = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.user;
    const newType = await TimeModel.createTime({
      name,
      userId,
    });
    res.created(newType, "Job Type  is created");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getTimes = async (req, res) => {
    try {
      const categories = await TimeModel.getAllTime();
      res.success(categories, "Category Fetched Successfully.");
    } catch (err) {
      errorResponseHandler(err, req, res);
    }
  };

module.exports = {
  createNewTime,
  getTimes,
};
