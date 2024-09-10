import express from "express";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";
import {
  addAdmin,
  adminLogout,
  getAllDoctors,
  login,
  patientLogout,
  patientRegister,
  userDetails,
} from "../controllers/user.js";
const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/admin/register", isAdminAuthenticated, addAdmin);
router.post("/login", login);
router.get("/doctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, userDetails);
router.get("/patient/me", isPatientAuthenticated, userDetails);
router.get("/admin/logout", isAdminAuthenticated, adminLogout);
router.get("/patient/logout", isPatientAuthenticated, patientLogout);

export default router;
