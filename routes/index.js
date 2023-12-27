const express = require("express");

const userRoute = require("./user.routes");
const jobRoute = require("./job.route");
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
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
module.exports = router;