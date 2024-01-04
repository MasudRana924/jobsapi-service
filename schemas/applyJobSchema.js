const mongoose = require("mongoose");
//Create a schema for the job
const applyJobSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  title: {
    type: String,
  },
  jobId: {
    type: String,
    ref: "Job",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  resume: {
    type: String,
  },
  education: {
    type: String,
  },
  degree: {
    type: String,
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
