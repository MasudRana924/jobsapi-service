const jwtSecret = process.env.JWT_SECRET;
const { errorResponseHandler } = require("../helper/errorrResponseHandler");
const { statusCodes } = require("../helper/statusCodes");
const jsonwebtoken = require("jsonwebtoken");

const createAuthenticationMiddleware = (role) => (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.headers.token;
    if (!token) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40113,
        },
      });
    }
    let decoded;
    try {
      decoded = jsonwebtoken.verify(token, jwtSecret);
    } catch (error) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40110,
        },
      });
    }
    if (decoded.role !== role) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40114,
        },
      });
    }
    req.user = decoded;
    return next();
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const userAuthenticate = createAuthenticationMiddleware("user");
const employerAuthenticate = createAuthenticationMiddleware("employer");
const adminAuthenticate = createAuthenticationMiddleware("admin");

module.exports = {
  userAuthenticate,
  employerAuthenticate,
  adminAuthenticate,
};
