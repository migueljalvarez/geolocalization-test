import asyncWrap from "../utils/asyncWrap.js";
import ApplicationError from "../utils/ApplicationError.js";
import { findOne as findOneUser } from "../services/user";
import JWT from "../middlewares/Jwt.js";
import { match } from "../helpers/passwordHash.js";

const auth = asyncWrap(async (req, res, next) => {
  const { email, password } = req.body;
  if (match(password)) {
    const user = await findOneUser({ email });

    if (!user) {
      throw new ApplicationError("user not registered", 401);
    }
    req.user = user;
    next();
  } else {
    throw new ApplicationError("Wrong email/password combination", 401);
  }
});

const login = asyncWrap(async (req, res) => {
  const payload = {
    id: req.user.id,
    email: req.user.email,
  };
  const { remember } = req.body;
  const token = JWT.sign(payload, remember);
  if (token) {
    res.status(200).json({
      accessToken: token,
    });
  }
});

const refresh = asyncWrap(async (req, res) => {
  const { email } = req.accessToken;
  const user = await findOneUser({ email });
  const payload = {
    id: user.id,
    email: user.email,
  };
  console.log("refresh token");
  let remember = false;
  if (!req.accessToken.exp) {
    remember = true;
  }
  const token = JWT.sign(payload, remember);
  if (token) {
    res.status(200).json({
      accessToken: token,
    });
  }
});
const AuthController = { auth, login, refresh };
export default AuthController;
