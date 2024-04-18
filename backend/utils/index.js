import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const ResponseHandler = (res, status, message = "", data = {}) => {
  return res.status(status).json({ message, data });
};

export const ResponseErrorHandler = (res, status, error = "") => {
  return res.status(status).json({ error });
};

export const ErrorHandler = (
  res,
  status = 500,
  message = "Internal Server Error"
) => {
  return res.status(status).json({ message });
};

export const HashPasswords = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const MatchPasswords = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

export const GenerateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

export const ValidateEmail = (email) => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(String(email).toLowerCase());
};

export const ValidateMobile = (mobile) => {
  let re = /^\d{10,13}$/;
  return re.test(mobile);
};

export const ValidateAlphanumeric = (text) => {
  let re = /^[a-zA-Z0-9\s]+$/;
  return re.test(String(text));
};

export const ValidateLength = (text, max = 25, min = 1) => {
  return text.length >= min && text.length <= max ? true : false;
};

export const PasswordStrength = (password) => {
  let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,24})(?=.*[0-9])(?=.*[@$!%*#?&])/;
  return re.test(password);
};
