const mongoose = require("mongoose");
//Create a schema for the job
const applyJobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    ref: "Job",
  },
  userId: {
    type: String,
    ref: "UserAccount",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

const ApplyJob = mongoose.model("ApplyJob", applyJobSchema);
module.exports = ApplyJob;
