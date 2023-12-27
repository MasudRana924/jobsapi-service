
const UserAccount = require("../schemas/userSchema");
const createUserAccount = async (data) => {
  const newUserAccount = new UserAccount(data);
  const createdUserAccount = await newUserAccount.save();
  return createdUserAccount;
};
const findAccountByEmail = async (email) => {
  const userAccount = await UserAccount.findOne({ email }).lean();
  return userAccount;
};
module.exports = {
  createUserAccount,
  findAccountByEmail,
};