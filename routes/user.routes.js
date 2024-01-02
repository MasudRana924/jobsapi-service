const { Router } = require("express");
const {
  userRegistration,
  userLogin,
  updateProfile,
} = require("../controllers/user.controller");
const {
  getEmployerJob,
  getEmployerPendingJob,
  getEmployerApprovedJob,
  getAdminJobsLists,
  updatedJob,
} = require("../controllers/job.controller");
const { employerAuthenticate, userAuthenticate, adminAuthenticate } = require("../middleware/authenticate");
const { createNewApplyJob, getUserJob } = require("../controllers/applyJob.controller");

const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const router = Router();
router.post("/registration", userRegistration);
router.post("/login", userLogin);

// post job as a employee
router.get("/upload/job", employerAuthenticate, getEmployerJob);
router.get("/pending/job", employerAuthenticate, getEmployerPendingJob);
router.get("/approved/job", employerAuthenticate, getEmployerApprovedJob);

// user apply job route
router.post("/apply/job", userAuthenticate, createNewApplyJob);
router.put("/update/profile", userAuthenticate, upload.single("resume"), updateProfile);
router.get("/apply/job", employerAuthenticate, getUserJob);

// admin section 
router.get("/admin/get/all", adminAuthenticate, getAdminJobsLists);
router.put("/admin/update/:jobId", adminAuthenticate, updatedJob);

module.exports = router;
