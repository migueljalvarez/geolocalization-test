import jwt from "../middlewares/jwt";

const buildSignUpUserDto = (user) => {
  const dto = {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    accessToken: jwt.sign(user, false),
  };
  return dto;
};

export { buildSignUpUserDto };
