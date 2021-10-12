import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import config from "../config/config";
const basename = path.basename(module.filename);
const db = {};
const uri = `${config.db.dialect}://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.database}`;

const sequelize = new Sequelize(uri);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.models = sequelize.models
export default db;
