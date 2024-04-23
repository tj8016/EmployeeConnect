import React from "react";
import { Link } from "react-router-dom";
import EnterOtp from "./EnterOtp";
import ChangePassword from "./ChangePassword";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";
import { Input } from "antd";
import SmallHeader from "../../components/common/SmallHeader";

const Body = (_this) => {
  return (
    <div className="text-gray-600 body-font py-6 px-8">
      <SmallHeader isLogin={true} />

      {_this.otpReceived === false && _this.changePassword === false ? (
        <div className="sm:p-8 flex flex-col justify-center w-[95%] sm:w-[80%] md:w-7/12 xl:w-1/3 mx-auto mt-4 min-h-[80vh]">
          <div className="text-center">
            <div className="w-14 h-14 p-3.5 bg-indigo-50 rounded-[28px] border-4 border-slate-50 justify-center items-center inline-flex mb-2">
              <HiOutlineKey className="text-xl text-blue-800" />
            </div>
          </div>
          <h3 className="text-center text-primary-text text-3xl font-semibold my-4">
            Forgot password?
          </h3>
          <div className=" text-center text-gray-medium text-base font-normal leading-normal mb-2">
            No worries, we’ll send you reset instructions.
          </div>

          <div className="relative mt-6 mb-2">
            <label
              htmlFor="email"
              className="leading-7 text-sm text-label font-medium"
            >
              Email Address*
            </label>

            <Input
              size="large"
              className="w-full bg-white px-3 py-2"
              placeholder="Enter your email"
              label={"email"}
              value={_this.formValue.email}
              onChange={(e) => {
                _this.setFormValue((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </div>

          <button
            onClick={() => _this.onResetPassword()}
            className="mt-5 text-white bg-primary border-0 py-3 px-8 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
          >
            Reset Password
          </button>

          <Link
            className="flex items-center justify-center mt-8 my-2 text-gray-medium text-sm font-medium"
            to={"/login"}
          >
            <AiOutlineArrowLeft size={18} className="mr-2" />
            Back to Log in
          </Link>
        </div>
      ) : _this.otpReceived === true && _this.changePassword === false ? (
        <EnterOtp _this={_this} />
      ) : (
        _this.otpReceived === false &&
        _this.changePassword === true && <ChangePassword _this={_this} />
      )}
    </div>
  );
};

export default Body;
