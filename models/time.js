const JobTime = require("../schemas/jobTimeSchema");
const createTime = async (data) => {
  const newTime = new JobTime(data);
  const createdTime = await newTime.save();
  return createdTime;
};
const getAllTime = async () => {
    const times = await JobTime.find().sort({createdAt:-1});
    return times;
  };
module.exports = {
  createTime,
  getAllTime,
};
