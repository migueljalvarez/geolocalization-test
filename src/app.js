import express from "express";
import cors from "cors"
import router from "./routes/router";
const app = express();

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))
app.use(express.json())
app.use('/api/v1', router)

export { app };
