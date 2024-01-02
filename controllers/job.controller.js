const JobModel = require("../models/job");
const Job = require('../schemas/jobSchema.js')
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

const getEmployerJobByDate = async (req, res) => {
  // try {
  //   const { userId } = req.user;

  //   // You can specify the timeFilter as 'today' to get jobs uploaded today
  //   const timeFilter = 'today';

  //   const job = await JobModel.employerJobByDate(userId, timeFilter);
  //   res.success(job, `Employer uploaded job for today fetched successfully.`);
  // } catch (err) {
  //   errorResponseHandler(err, req, res);
  // }
  try {
    const { userId } = req.user;

    // Set the number of days for the time range (e.g., 10 days ago)
    const daysAgo = 10;

    const job = await JobModel.employerJobByDate(userId, daysAgo);
    res.success(
      job,
      `Employer uploaded job for the last ${daysAgo} days fetched successfully.`
    );
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const getEmployerTodaysJob = async (req, res) => {
  try {
    const { userId } = req.user;
    const job = await JobModel.employerTodaysJob(userId);
    res.success(job, "Employer uploaded jobs for today fetched successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
// admin section
const getAdminJobsLists = async (req, res) => {
  try {
    const jobs = await JobModel.getAdminAllJob();
    res.success(jobs, "Job Fetched Successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

// update single job
const updatedJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const newUpdatedData = req.body
    const updateJobStatus = await JobModel.adminUpdateSingleJob(
      jobId,
      newUpdatedData
    );
    const responseData = {
      status: updateJobStatus?.status,
    };
    res.created(responseData, "Job  updated");
   
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
  getEmployerJobByDate,
  getEmployerTodaysJob,
  getAdminJobsLists,
  updatedJob,
};
