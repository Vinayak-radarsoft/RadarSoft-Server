require("dotenv").config();
const jwt = require("jsonwebtoken");

const signToken = async (payload) => {
  const { AccessExpiresIn, AccessPrivateKEY } = process.env;
  return new Promise((resolve, reject) => {
    const signOptions = {
      expiresIn: AccessExpiresIn || "1h",
      //   algorithm: "RS256",
    };

    jwt.sign(payload, AccessPrivateKEY, signOptions, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const signRefreshToken = async (payload) => {
  const { RefreshExpiresIn, RefreshPrivateKEY } = process.env;
  return new Promise((resolve, reject) => {
    const signOptions = {
      expiresIn: RefreshExpiresIn || "24h",
      //   algorithm: "RS256",
    };

    jwt.sign(payload, RefreshPrivateKEY, signOptions, function (err, token) {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

module.exports = { signToken, signRefreshToken };
