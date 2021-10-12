import db from "../models/models";
import ApplicationError from "../utils/ApplicationError";
import { encode } from "../helpers/passwordHash";
const { User } = db.models;

const create = async (data) => {
  const { password } = data;
  try {
    const user = { ...data, password: encode(password) };
    const result = await User.create(user);
    return result;
  } catch (error) {
    throw new ApplicationError(error, 500);
  }
};

const findOne = async (query) => {
  try {
    const user = await User.findOne({ where: query });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export { create, findOne };
