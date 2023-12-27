const UserModel = require("../models/user.js");
const { errorResponseHandler } = require("../helper/errorrResponseHandler.js");
const { statusCodes } = require("../helper/statusCodes.js");
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
      name,
      email,
      password: hashPassword,
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
      name: user.name,
      email: user.email,
      role: user.role,
    };
    res.success(responseData, "You have Successfully Loged In.");
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

module.exports = {
  userRegistration,
  userLogin,
};
