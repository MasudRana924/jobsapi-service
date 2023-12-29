const { Router } = require("express");
const {
  createNewJob,
  getJobsLists,
  getJob,
  deleteJob,
} = require("../controllers/job.controller");
const { employerAuthenticate, userAuthenticate } = require("../middleware/authenticate");
const { getApplyJobCOunt } = require("../controllers/applyJob.controller");
const { createNewType, getTypes } = require("../controllers/type.controller");
const { createNewTime, getTimes } = require("../controllers/time.controller");


const router = Router();
router.post("/create/new",employerAuthenticate,createNewJob);
router.get("/get/all", getJobsLists);
router.get("/get/:jobId", getJob);
router.delete("/get/:jobId", deleteJob);
router.get('/total/applyno/:jobId',getApplyJobCOunt);
router.post("/create/type",employerAuthenticate,createNewType);
router.get("/type",getTypes);
router.post("/create/time",employerAuthenticate,createNewTime);
router.get("/time",getTimes);

module.exports = router;
