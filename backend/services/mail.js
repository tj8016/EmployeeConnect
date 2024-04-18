import nodemailer from "nodemailer";
// import { otpMailTemplate } from "../mail/otp";

let transpoter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendOtp = async (to, name, otpValue) => {
  try {
    const option = {
      from: "CaledonKabab <" + process.env.MAIL_USER + ">",
      to: to,
      subject: "OTP Verification",
      html: `<p>${otpValue}</p>`,
    };
    const info = await transpoter.sendMail(option);
    console.log(info);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
