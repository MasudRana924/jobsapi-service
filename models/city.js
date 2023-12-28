const City= require("../schemas/citySchema");
const createCity = async (data) => {
  const newCity= new City(data);
  const createdCity = await newCity.save();
  return createdCity;
};
// const findAccountByEmail = async (email) => {
//   const userAccount = await UserAccount.findOne({ email }).lean();
//   return userAccount;
// };

const getAllCity = async () => {
    const cities = await City.find().sort({createdAt:-1});
    return cities;
  };
module.exports = {
    createCity,
    getAllCity
};