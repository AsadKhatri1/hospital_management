import jwt from "jsonwebtoken";
export const generateToken = async (user, message, statusCode, res) => {
  const token = await jwt.sign({ id: user._id }, process.env.JWTSECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({ success: true, message, token, user });
};
