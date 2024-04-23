import React, { useEffect, useState, useCallback } from "react";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { AiOutlineArrowLeft } from "react-icons/ai";

const EnterOtp = ({ _this }) => {
  const [otp, setOtp] = useState(_this.OTP);
  const [timer, setTimer] = useState(60);
  const timeOutCallback = useCallback(
    () => setTimer((currTimer) => currTimer - 1),
    []
  );

  useEffect(() => {
    _this.setOTP(otp);
  }, [otp]);

  useEffect(() => {
    timer > 0 && setTimeout(timeOutCallback, 1000);
  }, [timer, timeOutCallback]);

  const resetTimer = function () {
    if (!timer) {
      setTimer(60);
    }
  };

  return (
    <div className="sm:p-8 flex flex-col w-[90%] sm:w-[80%] md:w-[55%] xl:w-1/3 mx-auto mt-4 min-h-[80vh]">
      <div className="text-center">
        <div className="w-14 h-14 p-3.5 bg-indigo-50 rounded-[28px] border-4 border-slate-50 justify-center items-center inline-flex mb-2">
          <FiMail className="text-xl text-blue-800" />
        </div>
      </div>
      <h3 className="text-center text-primary-text text-3xl font-semibold my-3">
        Enter one time password (OTP)
      </h3>
      <div className=" text-center text-gray-medium text-base font-medium leading-normal mb-2">
        A 4-digit verification code has been sent to
        <span className="font-medium ml-1">{_this.formValue.email}</span>
      </div>
      <div className="flex items-center justify-center my-4">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          inputStyle={{
            height: "4rem",
            width: "4rem",
            border: "1px solid blue",
            borderRadius: "10px",
            padding: "5px",
            margin: "0px 10px",
            outline: "none",
          }}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <button
        onClick={() => _this.onOtpSubmit()}
        className="mt-6 text-white bg-primary border-0 py-3 px-8 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
      >
        Verfiy email
      </button>
      <h4 className="my-8 text-center text-gray-medium text-sm font-normal leading-tight">
        Didn’t receive the email?
        <span
          onClick={() => {
            timer === 0 && _this.onResendOTPSubmit();
            resetTimer();
          }}
          className={`ml-2 ${
            timer === 0 ? "text-blue-md" : "text-gray-medium"
          } text-sm font-semibold cursor-pointer select-none`}
        >
          Click to resend OTP
        </span>
        {timer != 0 && (
          <span className="text-sm font-semibold">
            {"( "}
            {timer}
            {" )"}
          </span>
        )}
      </h4>

      <Link
        className="flex items-center justify-center my-2 text-gray-medium font-medium text-sm"
        href={"/login"}
      >
        <AiOutlineArrowLeft size={18} className="mr-2" />
        Back to Log in
      </Link>
    </div>
  );
};

export default EnterOtp;
