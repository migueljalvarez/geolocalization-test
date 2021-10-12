import db from "../models/models";
import { encode } from "../helpers/passwordHash";
const { User } = db.models;

const create = async (data) => {
  const { password } = data;
  try {
    const user = { ...data, password: encode(password) };
    const result = await User.create(user);
    return result;
  } catch (error) {
    console.log(error);
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
