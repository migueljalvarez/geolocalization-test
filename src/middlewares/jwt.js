import jwt from "jsonwebtoken";
import asyncWrap from "../utils/asyncWrap";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;
const verifyToken = asyncWrap(async (req, res, next) => {
  let accessToken = req.headers["authorization"];
  if (!accessToken) {
    res.status(401).json({
      message: "Authorization header is not present",
    });
  } else {
    accessToken = accessToken.split(" ");
    if (accessToken[0] !== "Bearer") {
      res.status(401).json({
        message: "Invalid authorization header format",
      });
    } else {
      jwt.verify(accessToken[1], JWT_SECRET, (err, token) => {
        if (err) {
          res.status(500).json(err);
        } else if (token) {
          req.accessToken = token;
          next();
        }
      });
    }
  }
});

const sign = (payload, remember) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: remember ? "" : JWT_EXPIRATION_TIME,
  });
};
const JWT = { verifyToken, sign };
export default JWT;
