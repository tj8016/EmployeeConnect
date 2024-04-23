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
import { ImageDeleter, ImageUploader } from "../utils/imageUploader.js";
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
    const { email = "" } = req.body;

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
    otpStatus = await sendOtp(email, otpValue);
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

export const Forgetpassword = async (req, res, next) => {
  try {
    const { email = "", otp = "", password = "" } = req.body;

    //check if the user already exists
    const isUserExists = await DbUser.findOne({
      $or: [{ email: email }],
    });

    if (!isUserExists)
      return ResponseErrorHandler(res, 202, "User not Exists!");

    let otpExpiryLimit = 1;
    let expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() - otpExpiryLimit);

    if (otp && password) {
      const password_hash = await HashPasswords(password);

      let updated = await DbUser.findOneAndUpdate(
        { email: email },
        { $set: { password: password_hash } },
        { upsert: true }
      );
      if (!updated)
        return ResponseErrorHandler(
          res,
          202,
          "Failed to update password. Please contact system admin."
        );

      let user = { ...updated._doc };

      return ResponseHandler(res, 200, "Password Updated", {
        isUserUpdated: true,
      });
    } else if (otp) {
      let isOtpExists = await DbOtp.findOne({
        email: email,
        createdAt: { $gt: expiry },
      });
      if (!isOtpExists)
        return ResponseErrorHandler(res, 202, "Failed to verify OTP.");
      else if (isOtpExists) {
        // Delete the existing otp value
        await DbOtp.deleteOne({ email: email });
        return ResponseHandler(res, 200, "Otp Verified", {
          isOtpVerified: true,
        });
      }
    }

    // Send OTP
    let isOtpExists = await DbOtp.findOne({
      email: email,
      createdAt: { $gt: expiry },
    });
    if (isOtpExists)
      return ResponseErrorHandler(
        res,
        202,
        "Too many OTP requests. Please try after sometime."
      );

    // Create a unique otp
    const otpValue = Math.floor(1000 + Math.random() * 9000);

    // Send otp
    var otpStatus = null;
    otpStatus = await sendOtp(email, otpValue);
    if (!otpStatus)
      return ResponseErrorHandler(res, 202, "Failed to send OTP.");

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

export const ResendOtp = async (req, res, next) => {
  try {
    const { email = "" } = req.body;

    let validateError = null;
    if (email != "" && !ValidateEmail(email.trim())) {
      validateError = "Please enter a valid email id i.e abc@domain.com";
    }
    if (validateError) return ResponseErrorHandler(res, 202, validateError);

    // Send OTP
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
    otpStatus = await sendOtp(email, otpValue);
    if (!otpStatus)
      return ResponseErrorHandler(res, 202, "Failed to send OTP.");

    // store the otp on DB and send responce
    const inserted = await DbOtp.create({
      email,
      otp: otpValue,
    });
    if (!inserted) return ResponseErrorHandler(res, 202, "Failed to send OTP.");
    return ResponseHandler(res, 200, "Otp Sent", { otp: otpValue });
  } catch (err) {
    HandleServerError(res, req, err);
  }
};

/************************************* update profile function ***************************************/
export const UpdateProfile = async (req, res, next) => {
  try {
    // get all data from body
    const { first_name, last_name, bio = "", email, skills = [] } = req.body;
    const { _id } = req.user;

    const avatar = req.files?.avatar;

    const user = await DbUser.findOne({ _id });
    if (!user) return ResponseErrorHandler(res, 202, "User not found !");

    //upload avatar
    if (avatar) {
      // delete existing image if exist
      if (user?.avatar !== "") {
        const deleteImage = ImageDeleter(user?.avatar);
        if (!deleteImage)
          return ResponseErrorHandler(
            res,
            202,
            "Existing image file not Deleted."
          );
      }
      let storedUrl = ImageUploader("/uploads/avatars/", avatar);
      user.avatar = storedUrl;
    }

    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (skills.length) user.skills = skills;

    await user.save();

    return ResponseHandler(res, 200, "Profile updated !", user);
  } catch (error) {
    console.log("profile update error ->", error);
  }
};

export const UpdateSkills = async (req, res, next) => {
  try {
    const { skills = [] } = req.body;
    const { _id } = req.user;

    const user = await DbUser.findOne({ _id });
    if (!user) return ResponseErrorHandler(res, 202, "User not found !");

    user.skills = skills;

    await user.save();

    return ResponseHandler(res, 200, "Skills Updated !", user);
  } catch (error) {
    console.log("skills update error ->", error);
  }
};

export const CreateCertificate = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { certificate_title = "" } = req.body;
    const certificateFile = req?.files?.certificateFile;

    const user = await DbUser.findOne({ _id });
    if (!user) return ResponseErrorHandler(res, 202, "User not found !");

    if (certificate_title === "") {
      return ResponseErrorHandler(res, 202, "Title is Required");
    }
    let storedUrl = null;
    if (certificateFile !== undefined) {
      // Upload image or pdf on db
      storedUrl = ImageUploader("/uploads/certificates/", certificateFile);

      if (!storedUrl) {
        return ResponseErrorHandler(res, 202, "Failed to Upload Certificate.");
      }
      // Push the certificate data into the certificates array
      user.certificates.push({
        certificate_title: certificate_title,
        certificate_url: storedUrl,
      });

      await user.save();
      return ResponseHandler(res, 200, "Certificate Added", user);
    } else {
      return ResponseErrorHandler(res, 202, "Send Certificate First.");
    }
  } catch (error) {
    console.log("add certificate error ->", error);
  }
};

/***************************************** delete user certifcate ************************************* */
export const deleteCertificate = async (req, res, next) => {
  try {
    const { certificate_id } = req.body;
    const _id = req.user;

    const user = await DbUser.findOne({ _id });
    if (!user) return ResponseErrorHandler(res, 202, "User not found !");
    const file = user.certificates.find((items) =>
      items._id.equals(certificate_id)
    );
    if (file) {
      // delete image file
      const deleteImage = ImageDeleter(file?.certificate_url);
      if (!deleteImage)
        return ResponseErrorHandler(
          res,
          202,
          "Existing image file not Deleted."
        );
    }

    let newcertificate = user.certificates.filter(
      (item) => item._id != certificate_id
    );
    if (newcertificate) user.certificates = newcertificate;
    await user.save();

    return ResponseHandler(res, 200, "certificate deleted !", user);
  } catch (error) {
    console.log("certificate delete error ->", error);
  }
};

/************************************* delete profile function ***************************************/
export const deleteProfile = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    //delete all post of user from post db
    await DbPost.deleteMany({ owner: user_id });

    await DbUser.deleteOne({ _id: user_id });

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
    console.log("other profile error ->", error);
  }
};

/************************************* GetAllUser  ***************************************/
export const GetAllUser = async (req, res, next) => {
  try {
    const users = await DbUser.find();
    if (!users) return ResponseErrorHandler(res, 202, "Failed to get Users");

    return ResponseHandler(res, 200, "all user", users);
  } catch (error) {
    console.log("get all user ->", error);
  }
};
