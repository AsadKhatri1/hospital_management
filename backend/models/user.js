import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      default: "guest",
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "Please enter valid email"],
    },
    phone: {
      type: Number,
      required: true,
      minLength: [11, "Number should be at least 11 digits"],
    },
    nic: {
      type: String,
      required: true,
      minLength: [13, "NIC number should be at least 13 digits"],
    },
    dob: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["Patient", "Admin", "Doctor"],
    },
    doctorDepartment: {
      type: String,
    },
    dovAvatar: {
      public_id: String,
      type: String,
    },
  },
  { timestamps: true }
);

// functions to occur just before saving data

// hashing the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// hashed password comparision

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// web token at logging time
// userSchema.methods.generateJsonWebToken = async function () {
//    return await jwt.sign({ id: this._id }, process.env.JWTSECRET_KEY, {
//     expiresIn: process.env.EXPIRES_IN,
//   });
// };
export const User = mongoose.model("User", userSchema);
