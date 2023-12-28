const ApplyJob = require("../schemas/applyJobSchema");
const createApplyJob = async (data) => {
  const newJob = new ApplyJob(data);
  const createdNewJob = await newJob.save();
  return createdNewJob;
};
const userJob = async (userId) => {
    const job = await ApplyJob.find({ userId: userId });
    return job;
};


const jobApplyNumber=async(jobId)=>{
  const job = await ApplyJob.find({ jobId: jobId }).count();
  return job;
}
module.exports={
    createApplyJob ,
    userJob,
    jobApplyNumber
}