const { Router } = require("express");
const {
  employerAuthenticate,
} = require("../middleware/authenticate");
const { createNewCity, getCities } = require("../controllers/city.controller");


const router = Router();
router.post("/create/new", employerAuthenticate, createNewCity);
router.get("/all",getCities);

module.exports = router;