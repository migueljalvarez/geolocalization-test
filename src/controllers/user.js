import asyncWrap from "../utils/asyncWrap";
import { create as createUser } from "../services/user";
import { buildSignUpUserDto } from "../dto/buildSignupUserDto";

const create = asyncWrap(async (req, res) => {
  const user = await createUser(req.body);
  const result = buildSignUpUserDto(user);
  res.json(result);
});

const UserController = { create };
export default UserController;
