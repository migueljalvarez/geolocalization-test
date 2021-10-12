import  UserSchema  from "../schemas/user";
module.exports = (sequelize) => {
  const User = sequelize.define("User", UserSchema);
  return User;
};
