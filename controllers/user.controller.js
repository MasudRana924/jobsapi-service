const UserModel = require("../models/user.js");
const { errorResponseHandler } = require("../helper/errorrResponseHandler.js");
const { statusCodes } = require("../helper/statusCodes.js");
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require('cloudinary');
const fs = require("fs");
cloudinary.config({
    cloud_name: "dwcbsche7",
    api_key: "793652735628756",
    api_secret: "4lddg6ilcxsou-HotzvGd7L6fjA",
});
const userRegistration = async (req, res) => {
  try {
    const {firstName,lastName, email, password ,role} = req.body;
    const isEmailExist = await UserModel.findAccountByEmail(email);
    if (isEmailExist) {
      throw Object.assign(new Error(), {
        status: statusCodes.CONFLICT,
        error: {
          code: 40005,
        },
      });
    }
    const hashPassword = await bcrypt.hash(password, 9);
    const newUser = await UserModel.createUserAccount({
      firstName,lastName, 
      email,
      password: hashPassword,
      role
    });
    res.created(
      newUser,
      "User Registration is Successful. Your information will be verified."
    );
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};
const generateJWTToken = (user) => {
  const userData = {
    userId:user.userId,
    firstName:user.firstName,
    lastName:user.lastName,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(userData, jwtSecret, {
    expiresIn: "1d",
  });
  return token;

};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findAccountByEmail(email);
    if (!user) {
      throw Object.assign(new Error(), {
        status: statusCodes.NOT_FOUND,
        error: {
          code: 40401,
        },
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw Object.assign(new Error(), {
        status: statusCodes.NOT_FOUND,
        error: {
          code: 40125,
        },
      });
    }
    const token = generateJWTToken(user);
    const responseData = {
      token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
       phone:user?.phone,
      address:user?.address,
      education:user?.education,
      degree:user?.degree,
      resume:user?.resume
    };
    res.success(responseData, "You have Successfully Loged In.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

// const updateProfile = async (req, res) => {
//   try {
//     const { firstName,lastName,email,degree,phone, address,education } = req.body;
//     const { userId } = req.user;
//     let result = {};
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };
//     if (req.file) {
//       const file = req.file;
//       result = await cloudinary.uploader.upload(file.path, options);
//       fs.unlink(file.path, function (err) {
//         if (err) throw err;
//       });
//     }

//     const newUserdata = {firstName,lastName,email,degree,phone, address,education };
//     if (result.url) {
//       newUserdata.resume = result.url;
      
//     }
//     const updateUserProfile = await UserModel.updateProfile(userId,newUserdata);
//     const responseData = {
//       firstName: updateUserProfile?.firstName,
//       lastName: updateUserProfile?.lastName,
//       email: updateUserProfile?.email,
//       phone: updateUserProfile?.phone,
//       address: updateUserProfile?.address,
//       degree: updateUserProfile?.degree,
//       education: updateUserProfile?.education,
//       resume: updateUserProfile?.resume,
//     };
//     console.log("response data",responseData);
//     res.created(responseData, "User profile successfully updated");
//   } catch (err) {
//     errorResponseHandler(err, req, res);
//   }
// };
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, degree, phone, address, education } = req.body;
    const { userId } = req.user;
    let result = {};
    
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    if (req.file) {
      const file = req.file;
      result = await cloudinary.uploader.upload(file.path, options);
      fs.unlink(file.path, function (err) {
        if (err) throw err;
      });
    }

    const newUserdata = {
      firstName,
      lastName,
      email,
      degree,
      phone,
      address,
      education,
    };

    // Check if Cloudinary URL exists in the result
    if (result.url) {
      newUserdata.resume = result.url;
    }

    const updateUserProfile = await UserModel.updateProfile(userId, newUserdata);

    const responseData = {
      firstName: updateUserProfile?.firstName,
      lastName: updateUserProfile?.lastName,
      email: updateUserProfile?.email,
      phone: updateUserProfile?.phone,
      address: updateUserProfile?.address,
      degree: updateUserProfile?.degree,
      education: updateUserProfile?.education,
      resume: updateUserProfile?.resume,
    };

    console.log("response data --- ", responseData);
    res.created(responseData, "User profile successfully updated");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
}
module.exports = {
  userRegistration,
  userLogin,
  updateProfile,
};
