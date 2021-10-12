import bcrypt from "bcryptjs";
const salt = 10;

const encode = (password) => {
  const passwordHash = bcrypt.hashSync(password, salt);
  return passwordHash;
};

const match = (password)=>{
  const passwordHash = bcrypt.hashSync(password, salt);
  return bcrypt.compare(password, passwordHash)
}

export { encode, match };
