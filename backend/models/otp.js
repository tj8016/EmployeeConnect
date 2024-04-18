import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      trim: true,
    },
    otp: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export const DbOtp = new mongoose.model("DbOtp", otpSchema);
