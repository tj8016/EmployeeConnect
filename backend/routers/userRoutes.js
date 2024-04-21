import { Router } from "express";
import { isAuthenticated } from "../middleware/authentication.js";
import {
  CreateCertificate,
  LoginUser,
  OtherProfile,
  RegisterUser,
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

//authentic routes
router.post("/update", isAuthenticated, UpdateProfile);
router.post("/update-skills", isAuthenticated, UpdateSkills);
router.delete("/delete", isAuthenticated, deleteProfile);
router.post("/create-certificate", isAuthenticated, CreateCertificate);
router.delete("/delete-certificate", isAuthenticated, deleteCertificate);
router.post("/get-user", isAuthenticated, OtherProfile);

export default router;
