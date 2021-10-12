import http from "http";
import { app } from "./app";
import config from "./config/config";
import models from "./models/models"
const server = http.createServer(app);

models.sequelize.authenticate().then(()=>{
  return models.sequelize.sync({ force: false }).then(() => {
    server.listen(config.app.port);
  });
});


server.on("listening", () => {
  console.log('connection established successfully');
  console.log(`Server on listenning on ${config.app.port}`);
});
