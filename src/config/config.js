import dotenv from "dotenv";
dotenv.config();

const {
  PORT: port = 3000,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME,
  DIALECT,
  HERE_API_KEY,
  HERE_API_KEY_SECRET,
  TOMTOM_API_KEY,
} = process.env;

const config = {
  app: {
    port,
  },
  hereCredentials: {
    key: HERE_API_KEY,
    secret: HERE_API_KEY_SECRET,
  },
  tomtomCredentials: {
    key: TOMTOM_API_KEY,
  },
  db: {
    database: DB_DATABASE,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOSTNAME,
    dialect: DIALECT,
  },
};

export default config;
