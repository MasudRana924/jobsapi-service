const CityModel = require("../models/city.js");
const { errorResponseHandler } = require("../helper/errorrResponseHandler.js");
const createNewCity = async (req, res) => {
  try {
    const { name } = req.body;
    const { userId } = req.user;
    const newCity = await CityModel.createCity({
      name,
      userId,
    });
    res.created(newCity, "City is created");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const getCities = async (req, res) => {
    try {
      const cities = await CityModel.getAllCity();
      res.success(cities, "City Fetched Successfully.");
    } catch (err) {
      errorResponseHandler(err, req, res);
    }
  };
module.exports={
    createNewCity,
    getCities
}
