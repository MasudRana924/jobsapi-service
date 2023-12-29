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
const updateProfile = async (userId, profile) => {
  const updatedUserProfile = await UserAccount.findOneAndUpdate(
    { userId },
    profile,
    {
      runValidators: true,
      useFindAndModify: false,
      new: true,
    }
  );
  return updatedUserProfile;
};

module.exports = {
  createUserAccount,
  findAccountByEmail,
  updateProfile,
};
