import { Router } from "express";
import { isAuthenticated } from "../middleware/authentication.js";
import {
  CreateCertificate,
  Forgetpassword,
  GetAllUser,
  LoginUser,
  OtherProfile,
  RegisterUser,
  ResendOtp,
  SendOtp,
  UpdateProfile,
  UpdateSkills,
  deleteCertificate,
  deleteProfile,
} from "../controllers/userController.js";
const router = Router();

/********************************* all user routes *************************************/
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/send-otp", SendOtp);
router.post("/forgot-password", Forgetpassword);
router.post("/resend-otp", ResendOtp);

//authentic routes
router.get("/get-all-users", GetAllUser);
router.post("/update", isAuthenticated, UpdateProfile);
router.post("/update-skills", isAuthenticated, UpdateSkills);
router.delete("/delete-user", isAuthenticated, deleteProfile);
router.post("/create-certificate", isAuthenticated, CreateCertificate);
router.delete("/delete-certificate", isAuthenticated, deleteCertificate);
router.post("/get-user", isAuthenticated, OtherProfile);

export default router;
