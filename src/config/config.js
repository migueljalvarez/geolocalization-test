import dotenv from "dotenv";
dotenv.config();

const { PORT: port = 3000 } = process.env;
const config = {
  app: {
    port,
  },
};

export default config;
