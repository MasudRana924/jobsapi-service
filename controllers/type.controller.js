const TypeModel = require("../models/type.js");
const { errorResponseHandler } = require("../helper/errorrResponseHandler.js");
const createNewType = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.user;
    const newType = await TypeModel.createType({
      name,
      userId,
    });
    res.created(newType, "Job Type  is created");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getTypes = async (req, res) => {
  try {
    const types = await TypeModel.getAllType();
    res.success(types, "Job Type Fetched Successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

module.exports = {
  createNewType,
  getTypes,
};
