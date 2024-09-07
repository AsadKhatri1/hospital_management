import express from "express";
import { addAdmin, login, patientRegister } from "../controllers/user.js";
const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/admin/register", addAdmin);
router.post("/login", login);

export default router;
