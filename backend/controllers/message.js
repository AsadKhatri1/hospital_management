import { Message } from "../models/message.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import validator from "validator";

export const sendMessage = catchAsyncError(async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return res
      .status(400)
      .json({ message: "Please fill full form", success: false });
  }
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ message: "Enter valid email", success: false });
  }
  if (phone.length < 11) {
    return res
      .status(400)
      .json({
        message: "Phone number must be at least 11 characters",
        success: false,
      });
  }

  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({ success: true, message: "Message sent succesfully" });
});
