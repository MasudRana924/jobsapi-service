const ApplyJobModel = require("../models/applyJob.js");
const { errorResponseHandler } = require("../helper/errorrResponseHandler.js");
const createNewApplyJob = async (req, res) => {
  try {
    const { companyName, title,jobId } = req.body;
    const { userId } = req.user;
    const newJob = await ApplyJobModel.createApplyJob({
      companyName,
      title,
      jobId,
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


module.exports={
    createNewApplyJob,
    getUserJob,
    getApplyJobCOunt
}