import { User } from "../models/user.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncError(async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    email,
    dob,
    phone,
    nic,
    gender,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !dob ||
    !phone ||
    !nic ||
    !gender ||
    !role
  ) {
    return res.status(400).json({ success: false, message: "Enter full form" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }
  if (phone.length < 11 || password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Phone number or password is less than required",
    });
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    dob,
    phone,
    nic,
    gender,
    role,
  });
  generateToken(user, "Patient registered succesfully", 200, res);
});

export const login = catchAsyncError(async (req, res) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return res.status(400).json({
      success: false,
      message: "Fields are required",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "confirm password does not match",
    });
  }

  const userExists = await User.findOne({ email }).select("+password");
  if (!userExists) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  //   comparing password

  const isPasswordMatched = await userExists.comparePassword(password);
  if (!isPasswordMatched) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  //   checking role

  if (role !== userExists.role) {
    return res
      .status(400)
      .json({ success: false, message: "Role does not match" });
  }
  //   logging in the user
  generateToken(userExists, "Loggedin succesfully", 200, res);
});

// adding admin

export const addAdmin = catchAsyncError(async (req, res) => {
  const { firstName, lastName, password, email, dob, phone, nic, gender } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !dob ||
    !phone ||
    !nic ||
    !gender
  ) {
    return res.status(400).json({ success: false, message: "Enter full form" });
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return res
      .status(400)
      .json({
        success: false,
        message: `${isRegistered.role} already exists with this email`,
      });
  }
  const admin = await User.create({
    firstName,
    lastName,
    password,
    email,
    dob,
    phone,
    nic,
    gender,
    role: "Admin",
  });
  generateToken(admin, "Admin registered succesfully", 200, res);
});
