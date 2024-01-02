const mongoose = require("mongoose");
const uuidv4 = require("uuid").v4;
//Create a schema for the USer
const userAccountSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuidv4,
    required: true,
  },
  firstName: {
    type: String,
    required:true
  },
  lastName: {
    type: String,
    required:true
  },
  role: {
    type: String,
    default:"user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  image: {
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
  createdAt: {
    type: Date,
    default: Date.now,
},
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserAccount = mongoose.model("UserAccount", userAccountSchema);
module.exports = UserAccount;