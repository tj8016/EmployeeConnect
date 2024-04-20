import { Router } from "express";
import { isAuthenticated } from "../middleware/authentication.js";
import {
  LoginUser,
  OtherProfile,
  RegisterUser,
  SendOtp,
  UpdateProfile,
  deleteCertificate,
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
router.delete("/delete-certificate", isAuthenticated, deleteCertificate);
router.post("/get-user", isAuthenticated, OtherProfile);

export default router;
