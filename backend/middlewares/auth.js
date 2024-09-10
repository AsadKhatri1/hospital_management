import { User } from "../models/user.js";
import { catchAsyncError } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return res
      .status(400)
      .json({ success: false, message: "Admin is not authenticated" });
  }
  const decoded = jwt.verify(token, process.env.JWTSECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req?.user?.role !== "Admin") {
    return res.status(403).json({ success: false, message: "Not authorized" });
  }
  next();
});

export const isPatientAuthenticated = catchAsyncError(
  async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Patient is not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWTSECRET_KEY);
    req.user = await User.findById(decoded.id);
    if (req.user.role !== "Patient") {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }
    next();
  }
);
