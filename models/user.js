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

const userUpdatePassword = async (userId, newPassword) => {

  // const isPasswordMatched = await UserAccount.comparePassword(req.body.oldPassword);
  // const updatedPassword = await UserAccount.findById(
  //   { userId: userId },
  //   { $set: { password: newPassword } },
  //   {
  //     new: true,
  //     useFindAndModify: false,
  //   }
  // );
  const user=await UserAccount.findOne({userId:userId}).select('+password');
  const isPasswordMatched = await user.comparePassword(newPassword.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password does not match", 400));
    }
    // if (req.body.newPassword !== req.body.confirmPassword) {
    //     return next(new ErrorHandler("New password & confirm password not matched", 400));
    // }

  return user;
};

module.exports = {
  createUserAccount,
  findAccountByEmail,
  updateProfile,
  userUpdatePassword,
};
