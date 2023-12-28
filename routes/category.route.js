const { Router } = require("express");
const {
  employerAuthenticate,
} = require("../middleware/authenticate");
const { createNewCategory, getCategories } = require("../controllers/category.controller");

const router = Router();
router.post("/create/new", employerAuthenticate, createNewCategory);
router.get("/all", getCategories);

module.exports = router;
