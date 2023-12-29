const JobModel = require("../models/job");
const { errorResponseHandler } = require("../helper/errorrResponseHandler.js");
const createNewJob = async (req, res) => {
  try {
    const {
      companyName,
      salary,
      title,
      city,
      category,
      location,
      vacancy,
      description,
      time,
      type,
    } = req.body;
    const { userId } = req.user;

    const newJob = await JobModel.createJob({
      companyName,
      salary,
      title,
      location,
      city,
      category,
      vacancy,
      description,
      time,
      type,
      userId,
    });
    res.created(newJob, "Job is created");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
// const getJobsLists = async (req, res) => {
//   try {

//     const { city} = req.query;
//     console.log("city",city);
//          const jobs = await JobModel.getAllJobs();
//     res.success(jobs, "Job Fetched Successfully.");
//   } catch (err) {
//     errorResponseHandler(err, req, res);
//   }
// };
const getJobsLists = async (req, res) => {
  try {
    const { city, category, search, type, time } = req.query;

    // Construct filters object
    const filters = {};

    // Add filters based on the provided parameters
    if (city) {
      filters.city = city;
    }

    if (category) {
      filters.category = category;
    }
    if (type) {
      filters.type = type;
    }
    if (time) {
      filters.time = time;
    }
    if (search) {
      filters.search = search;
    }
    // Call the getAllJobs function with the filters
    const jobs = await JobModel.getAllJobs(filters);

    res.success(jobs, "Jobs Fetched Successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await JobModel.getSingleJob(jobId);

    res.success(job, "Job get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await JobModel.deleteSingleJob(jobId);

    res.success(job, "Job delete successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

// user uploaded job list
const getEmployerJob = async (req, res) => {
  try {
    const { userId } = req.user;
    const job = await JobModel.employerJob(userId);
    res.success(job, "Employer uploaded job get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getEmployerPendingJob = async (req, res) => {
  try {
    const { userId } = req.user;
    const job = await JobModel.employerPendingJob(userId);
    res.success(job, "Employer pending job get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getEmployerApprovedJob = async (req, res) => {
  try {
    const { userId } = req.user;
    const job = await JobModel.employerApprovedJob(userId);
    res.success(job, "Employer approved job get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
module.exports = {
  createNewJob,
  getJobsLists,
  getJob,
  deleteJob,
  getEmployerJob,
  getEmployerPendingJob,
  getEmployerApprovedJob,
};
