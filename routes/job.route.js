const { Router } = require("express");
const {
  createNewJob,
  getJobsLists,
  getJob,
  deleteJob,
} = require("../controllers/job.controller");
const { employerAuthenticate } = require("../middleware/authenticate");


const router = Router();
router.post("/create/new",employerAuthenticate,createNewJob);
router.get("/get/all", getJobsLists);
router.get("/get/:jobId", getJob);
router.delete("/get/:jobId", deleteJob);


module.exports = router;
