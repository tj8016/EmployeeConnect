import React, { useState, useEffect } from "react";
import Body from "./Body";
import toast from "react-hot-toast";
import { sendOtp, signUp } from "../../services/operations/authApi";
// import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../../reducer/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
  //   const router = useRoutes();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData, loading } = useSelector((state) => state.auth);
  const [otpReceived, setOtpReceived] = useState(false);
  const [OTP, setOTP] = useState("");
  const [formValue, setFormValue] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    otp: "",
    account_type: "Employee",
  });

  const onSignUp = async () => {
    if (formValue.password !== formValue.confirm_password) {
      return toast.error("Password doesn't match.");
    }
    if (formValue?.password?.length < 8)
      return toast.error("Password must be at least 8 characters.");

    const data = {
      first_name: formValue.first_name,
      last_name: formValue.last_name,
      email: formValue.email,
    };

    dispatch(setSignupData(formValue));
    dispatch(sendOtp(data, setOtpReceived, setFormValue));
  };

  const onOtpSubmit = () => {
    const payload = {
      ...signupData,
      otp: OTP,
    };
    dispatch(signUp(payload, navigate));
  };

  const onResendOTPSubmit = () => {
    // dispatch(loadingStart());
    // API.auth
    //   .ResendOTP({ email: formValue.email })
    //   .then((response) => {
    //     if (response)
    //       toast.success("OTP has been resent to your email account.");
    //   })
    //   .finally(() => {
    //     dispatch(loadingStop());
    //   });
  };

  const _this = {
    formValue,
    setFormValue,
    otpReceived,
    setOtpReceived,
    onSignUp,
    onOtpSubmit,
    OTP,
    setOTP,
    onResendOTPSubmit,
  };
  return (
    <main>
      <Body _this={_this} />
    </main>
  );
};

export default SingUp;
