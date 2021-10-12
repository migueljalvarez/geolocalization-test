import { Router } from "express";
import JWT from "../middlewares/Jwt";
import AuthController from "../controllers/auth";
import UserController from "../controllers/user";
import GeoCodeController from "../controllers/geocode";


// Request

const router = Router();

router.get("/", (req, res) => {
  res.send("Api is running");
});
router.post("/signup", UserController.create);
router.post("/login", AuthController.auth, AuthController.login);
router.post("/refresh-token", JWT.verifyToken, AuthController.refresh);
router.get("/address", GeoCodeController.authHere, GeoCodeController.find);
// router.get("/address", (req, res) => {

//   // console.log(token)
//   // const headers = {
//   //   Authorization: `Bearer ${token.access_token}`,
//   // };
//   // request({
//   //   url: `https://geocode.search.hereapi.com/v1/geocode?q=${req.query.address}`,
//   //   method: "GET",
//   //   headers: headers,
//   // }, (error, response, body)=>{
//   //   console.log(body)
//   // });
// });

export default router;
