const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;
const jobTimeSchema = new mongoose.Schema({
  jobTimeId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  name: {
    type: String,
    required: true,
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

const JobTime = mongoose.model("JobTime", jobTimeSchema);
module.exports = JobTime;
