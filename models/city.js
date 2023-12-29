const City= require("../schemas/citySchema");
const createCity = async (data) => {
  const newCity= new City(data);
  const createdCity = await newCity.save();
  return createdCity;
};

const getAllCity = async () => {
    const cities = await City.find().sort({createdAt:-1});
    return cities;
  };
module.exports = {
    createCity,
    getAllCity
};