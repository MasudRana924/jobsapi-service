const JobType = require("../schemas/jobTypeSchema");
const createType = async (data) => {
  const newType = new JobType(data);
  const createdType = await newType.save();
  return createdType;
};
const getAllType = async () => {
  const types = await JobType.find().sort({ createdAt: -1 });
  return types;
};
module.exports = {
  createType,
  getAllType,
};
