const { Router } = require("express");
const {
  userRegistration,
  userLogin,
} = require("../controllers/user.controller");
const {
  getEmployerJob,
  getEmployerPendingJob,
  getEmployerApprovedJob,
} = require("../controllers/job.controller");
const { employerAuthenticate, userAuthenticate } = require("../middleware/authenticate");
const { createNewApplyJob, getUserJob } = require("../controllers/applyJob.controller");
const { updateProfile } = require("../models/user");

const router = Router();
router.post("/registration", userRegistration);
router.post("/login", userLogin);

// post job as a employee
router.get("/upload/job", employerAuthenticate, getEmployerJob);
router.get("/pending/job", employerAuthenticate, getEmployerPendingJob);
router.get("/approved/job", employerAuthenticate, getEmployerApprovedJob);

// user apply job route
router.post("/apply/job", userAuthenticate, createNewApplyJob);
router.post("/update/profile", userAuthenticate, updateProfile);
router.get("/apply/job", employerAuthenticate, getUserJob);

module.exports = router;
