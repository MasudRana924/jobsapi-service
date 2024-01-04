const ApplyJobModel = require("../models/applyJob.js");
const { errorResponseHandler } = require("../helper/errorrResponseHandler.js");
const cloudinary = require("cloudinary");
const fs = require("fs");
cloudinary.config({
  cloud_name: "dwcbsche7",
  api_key: "793652735628756",
  api_secret: "4lddg6ilcxsou-HotzvGd7L6fjA",
});
const createNewApplyJob = async (req, res) => {
  try {
    const {
      companyName,
      title,
      jobId,
      firstName,
      lastName,
      email,
      phone,
      address,
      education,
      degree,
    } = req.body;
    const { userId } = req.user;
    let result = {};

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    if (req.file) {
      const file = req.file;
      result = await cloudinary.uploader.upload(file.path, options);
      fs.unlink(file.path, function (err) {
        if (err) throw err;
      });
    }
    const resume = result.url;
    const newJob = await ApplyJobModel.createApplyJob({
      companyName,
      title,
      jobId,
      firstName,
      lastName,
      email,
      phone,
      address,
      education,
      degree,
      resume,
      userId,
    });
    res.created(newJob, "Job is applied");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
// user job
const getUserJob = async (req, res) => {
  try {
    const { userId } = req.user;
    const job = await ApplyJobModel.userJob(userId);
    res.success(job, "Job get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getApplyJobCOunt = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await ApplyJobModel.jobApplyNumber(jobId);
    res.success(job, "Job get successfully.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

module.exports = {
  createNewApplyJob,
  getUserJob,
  getApplyJobCOunt,
};
