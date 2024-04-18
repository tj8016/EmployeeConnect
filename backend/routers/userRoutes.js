import { Router } from "express";
import { isAuthenticated } from "../middleware/authentication.js";
import {
  LoginUser,
  RegisterUser,
  SendOtp,
  UpdateProfile,
  deleteProfile,
} from "../controllers/userController.js";
const router = Router();

/********************************* all user routes *************************************/
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/send-otp", SendOtp);

//authentic routes
router.post("/update", isAuthenticated, UpdateProfile);
router.delete("/delete", isAuthenticated, deleteProfile);

export default router;
