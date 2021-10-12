import { create as createUser } from "../services/user";
import { buildSignUpUserDto } from "../dto/buildSignupUserDto";

const create = async (req, res) => {
  try {
    const user = await createUser(req.body);
    const result = buildSignUpUserDto(user);
    res.json(result);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
};

const UserController = { create };
export default UserController;
