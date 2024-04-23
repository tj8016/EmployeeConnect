import nodemailer from "nodemailer";
// import { otpMailTemplate } from "../mail/otp";

let transpoter = nodemailer.createTransport({
  service: "Gmail",
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: "tohidujjamanhoque@gmail.com",
    pass: "uoquvfvuvgaszbdr",
  },
});

export const sendOtp = async (to, otpValue) => {
  try {
    const option = {
      from: "Employee Connect <" + process.env.MAIL_USER + ">",
      to: to,
      subject: "OTP Verification",
      html: `<p>${otpValue}</p>`,
    };
    const info = await transpoter.sendMail(option);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
