const ApiFeatures = require("../helper/apiFeatures");
const Job = require("../schemas/jobSchema");
const createJob = async (data) => {
  const newJob = new Job(data);
  const createdNewJob = await newJob.save();
  return createdNewJob;
};
// const getAllJobs = async () => {
//   const jobs = await Job.find({status:'approved'}).sort({createdAt:-1});
//   return jobs;
// };

const getAllJobs = async (filters) => {
  // Construct the base query with the 'status' filter
  const query = { status: 'approved' };

  // Add additional filters based on the provided parameters
  if (filters.city) {
    query.city = filters.city;
  }

  if (filters.category) {
    query.category =filters.category;
  }
  if (filters.type) {
    query.type =filters.type;
  }
  if (filters.time) {
    query.time =filters.time;
  }
  if (filters.search) {
    query.$text = { $search: filters.search };
  }

  // Fetch jobs based on the constructed query and sort by 'createdAt'
  const jobs = await Job.find(query).sort({ createdAt: -1 });
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
