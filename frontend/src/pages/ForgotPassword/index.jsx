import React, { useState } from "react";
import Body from "./Body";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resendOtp } from "../../services/operations/authApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otpReceived, setOtpReceived] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [OTP, setOTP] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const onResetPassword = () => {
    forgotPassword(formValue)
      .then((response) => {
        if (response) {
          if (response.otp) {
            setOtpReceived(true);
            toast.success("OTP has been sent to your email account.");
          }
        }
        return response;
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  const onOtpSubmit = () => {
    const payload = {
      ...formValue,
      otp: OTP,
    };
    forgotPassword(payload)
      .then((response) => {
        if (response) {
          setOtpReceived(false);
          setChangePassword(true);
          toast.success("OTP verified successfully.");
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  const onChangePasswordSubmit = () => {
    if (formValue.password !== formValue.confirmPassword) {
      return toast.error("Password doesn't match.");
    }
    const payload = {
      ...formValue,
      otp: OTP,
    };

    forgotPassword(payload)
      .then((response) => {
        if (response?.isUserUpdated) {
          toast.success("Your Password is Changed.");
          setOtpReceived(false);
          setChangePassword(false);
          navigate("/login");
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  const onResendOTPSubmit = () => {
    resendOtp({ email: formValue.email })
      .then((response) => {
        if (response) {
          toast.success("OTP has been resent to your email account.");
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  const _this = {
    formValue,
    setFormValue,
    OTP,
    setOTP,
    onResetPassword,
    onOtpSubmit,
    onChangePasswordSubmit,
    otpReceived,
    changePassword,
    onResendOTPSubmit,
  };

  return (
    <main>
      <Body {..._this} />
    </main>
  );
};

export default ForgotPassword;
