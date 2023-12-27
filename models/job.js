const Job = require("../schemas/jobSchema");
const createJob = async (data) => {
  const newJob = new Job(data);
  const createdNewJob = await newJob.save();
  return createdNewJob;
};
const getAllJobs = async () => {
  const jobs = await Job.find({status:'pending'}).sort({createdAt:-1});
  return jobs;
};
const getSingleJob = async (jobId) => {
  const job = await Job.findOne({jobId:jobId });
  return job;
};
const deleteSingleJob = async (jobId) => {
  const job = await Job.findByIdAndDelete({ _id: jobId });
  return job;
};
const employerJob = async (userId) => {
  const job = await Job.find({ userId: userId });
  return job;
};
const employerPendingJob = async (userId) => {
  const job = await Job.find({userId: userId,status:'pending'}).exec();
  return job;
};
const employerApprovedJob = async (userId) => {
  const job = await Job.find({userId: userId,status:'approved'}).exec();
  return job;
};
module.exports = {
  createJob,
  getAllJobs,
  getSingleJob,
  deleteSingleJob,
  employerJob,
  employerPendingJob,
  employerApprovedJob
};
