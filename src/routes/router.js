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
router.get("/refresh/token", JWT.verifyToken, AuthController.refresh);
router.get(
  "/address",
  JWT.verifyToken,
  GeoCodeController.authHere,
  GeoCodeController.find
);

export default router;
