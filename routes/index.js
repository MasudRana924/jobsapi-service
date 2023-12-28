const express = require("express");

const userRoute = require("./user.routes");
const jobRoute = require("./job.route");
const categoryRoute = require("./category.route");
const cityRoute = require("./city.route");
const router = express.Router();
const defaultRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/job",
    route: jobRoute,
  },
  {
    path: "/category",
    route: categoryRoute,
  },
  {
    path: "/city",
    route: cityRoute,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;