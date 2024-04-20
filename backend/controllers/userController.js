import { DbPost } from "../models/post.js";
import { DbUser } from "../models/user.js";
import { DbOtp } from "../models/otp.js";
import cloudinary from "cloudinary";
import {
  HashPasswords,
  ResponseHandler,
  ResponseErrorHandler,
  GenerateToken,
  MatchPasswords,
  ValidateEmail,
} from "../utils/index.js";
import { sendOtp } from "../services/mail.js";
/************************************* login function ***************************************/
export const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await DbUser.findOne({ email }).select("+password");
    //if user not found then return
    if (!user) return ResponseErrorHandler(res, 202, "User not found !");

    // match password
    const isPasswordMatched = await MatchPasswords(password, user.password);
    if (!isPasswordMatched)
      return ResponseErrorHandler(res, 202, "Password not matched !");

    const token = GenerateToken(user._id);
    user = { ...user.toObject(), token };

    return ResponseHandler(res, 200, "Logged in", user);
  } catch (error) {
    console.log("login error ->", error);
  }
};

/************************************* register function ***************************************/
export const RegisterUser = async (req, res, next) => {
  try {
    //**avatar will be implemented later
    const {
      first_name = "",
      last_name = "",
      email = "",
      skills = [],
      certificates = [],
      avatar = "",
      password = "",
      account_type = "",
      bio = "",
      otp = "",
    } = req.body;
    //check if the user already exists
    const isExists = await DbUser.findOne({
      $or: [{ email: email }],
    });
    if (isExists)
      return ResponseErrorHandler(res, 404, "Email already exists!");

    // Otp Validation
    let expiry = new Date();
    let otpExpiryLimit = 1;
    expiry.setMinutes(expiry.getMinutes() - otpExpiryLimit);
    let isOtpExists = await DbOtp.findOne({
      email: email,
      otp: otp,
      createdAt: { $gt: expiry },
    });
    if (!isOtpExists)
      return ResponseErrorHandler(res, 202, "Failed to verify OTP.");
    else if (isOtpExists) {
      await DbOtp.deleteOne({ email: email });
    }

    const lastInsertedUser = await DbUser.find().sort({ _id: -1 }).limit(1);
    let user_id = "";
    if (lastInsertedUser.length === 0) user_id = "1000";
    else {
      const id = Number(lastInsertedUser[0].user_id) + 1;
      user_id = id.toString();
    }

    let hashedPass = await HashPasswords(password);

    let user = await DbUser.create({
      first_name,
      last_name,
      user_id,
      skills,
      certificates,
      email,
      bio,
      avatar,
      account_type,
      password: hashedPass,
    });
    if (!user) return ResponseErrorHandler(res, 400, "Failed to create user");
    // let token = GenerateToken(user._id, account_type);

    // user = { ...user.toObject(), token };
    return ResponseHandler(res, 200, "User Created !");
  } catch (error) {
    console.log("register error ->", error);
  }
};

/************************************* send otp function ***************************************/
export const SendOtp = async (req, res, next) => {
  try {
    // get the phone_number from req.body
    const { first_name = "", last_name = "", email = "" } = req.body;

    // Validate the phone_number
    let validateError = null;
    if (email != "" && !ValidateEmail(email.trim())) {
      validateError = "Please enter a valid email id i.e abc@domain.com";
    }
    if (validateError) return ResponseErrorHandler(res, 202, validateError);

    // Check user is present or not
    const isExists = await DbUser.findOne({
      $or: [{ email: email }],
    });
    if (isExists)
      return ResponseErrorHandler(res, 202, "Email already exists!");

    // Send Otp
    let otpExpiryLimit = 1;
    let expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() - otpExpiryLimit);
    let isOtpExists = await DbOtp.findOne({
      email: email,
      createdAt: { $gt: expiry },
    });

    if (isOtpExists) {
      return ResponseErrorHandler(res, 202, "To many otp send");
    }
    // Delete the existing otp value
    await DbOtp.deleteOne({ email: email });

    // Create a unique otp
    const otpValue = Math.floor(1000 + Math.random() * 9000);

    // Send otp
    var otpStatus = null;
    const name = first_name + " " + last_name;
    otpStatus = await sendOtp(email, name, otpValue);
    if (!otpStatus)
      return ResponseErrorHandler(res, 202, "Failed to send OTP.");

    // store the otp on DB and send responce
    const inserted = await DbOtp.create({
      email,
      otp: otpValue,
    });
    if (!inserted) return ResponseErrorHandler(res, 202, "Failed to send OTP.");
    return ResponseHandler(res, 200, "Otp Sent", { otp: otpValue });
  } catch (error) {
    console.log("send otp error ->", error);
    return error;
  }
};

/************************************* update profile function ***************************************/
export const UpdateProfile = async (req, res, next) => {
  try {
    //**avatar update will be implemented later
    const {
      first_name,
      last_name,
      email,
      skills = [],
      files = [],
      bio = "",
      avatar,
    } = req.body;
    const { _id } = req.user;

    const user = await DbUser.findOne({ _id });
    //upload certificates
    let newcertificates = user.certificates;
    for (let item of files) {
      let myCloud = await cloudinary.v2.uploader.upload(item, {
        folder: "crud_users",
      });
      newcertificates = [
        ...newcertificates,
        {
          public_id: myCloud.public_id,
          avatar_url: myCloud.secure_url,
        },
      ];
    }

    //upload avatar
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "crud_users",
    });
    if (avatar)
      user.avatar = {
        public_id: myCloud.public_id,
        avatar_url: myCloud.secure_url,
      };

    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (skills.length) user.skills = skills;
    if (newcertificates.length) user.certificates = newcertificates;
    if (bio) user.bio = bio;

    await user.save();

    return ResponseHandler(res, 200, "Profile updated !", user);
  } catch (error) {
    console.log("profile update error ->", error);
  }
};

/************************************* delete profile function ***************************************/
export const deleteProfile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    //delete all post of user from post db
    await DbPost.deleteMany({ owner: _id });

    await DbUser.deleteOne({ _id });

    return ResponseHandler(res, 200, "Profile deleted !");
  } catch (error) {
    console.log("profile delete error ->", error);
  }
};

/************************************* get other user profile  ***************************************/
export const OtherProfile = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await DbUser.findOne({ _id: id });
    if (!user) return ResponseErrorHandler(res, 202, "User not found !");

    return ResponseHandler(res, 200, "profile found", user);
  } catch (error) {
    console.log("profile delete error ->", error);
  }
};
