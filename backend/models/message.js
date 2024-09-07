import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
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
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
