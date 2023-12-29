const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;
//Create a schema for the job
const jobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  image:String,
  title: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  vacancy: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
   time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  userId: {
    type: String,
    ref: "UserAccount",
    // required: true,
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

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
