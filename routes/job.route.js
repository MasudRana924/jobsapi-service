const { Router } = require("express");
const {
  createNewJob,
  getJobsLists,
  getJob,
  deleteJob,
} = require("../controllers/job.controller");
const { employerAuthenticate, userAuthenticate } = require("../middleware/authenticate");
const { getApplyJobCOunt } = require("../controllers/applyJob.controller");


const router = Router();
router.post("/create/new",employerAuthenticate,createNewJob);
router.get("/get/all", getJobsLists);
router.get("/get/:jobId", getJob);
router.delete("/get/:jobId", deleteJob);
router.get('/total/applyno/:jobId',getApplyJobCOunt)

module.exports = router;
