import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";
import { Input } from "antd";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ChangePassword = ({ _this }) => {
  return (
    <div className="sm:p-8 flex flex-col xs:w-full w-[90%] sm:w-[80%] md:w-[55%] xl:w-1/3 mx-auto mt-4 min-h-[80vh]">
      <div className="text-center">
        <div className="w-14 h-14 p-3.5 bg-indigo-50 rounded-[28px] border-4 border-slate-50 justify-center items-center inline-flex mb-2">
          <HiOutlineKey className="text-xl text-blue-800" />
        </div>
      </div>
      <h3 className="text-center text-primary-text text-3xl font-semibold my-3">
        Set new password
      </h3>
      <div className=" text-center text-gray-medium text-base font-normal leading-normal my-2">
        Your new password must be different from previously used passwords.
      </div>

      <div className="relative mt-6 mb-2">
        <label
          htmlFor="password"
          className="leading-7 text-sm text-label font-medium"
        >
          Password*
        </label>

        <Input.Password
          size="large"
          className="w-full bg-white px-3 py-2"
          placeholder="Password"
          label={"Password"}
          value={_this.formValue.password}
          iconRender={(visible) =>
            visible ? <BsEye size={15} /> : <BsEyeSlash size={15} />
          }
          onChange={(e) => {
            _this.setFormValue((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
      </div>
      <h3 className=" mb-4 text-gray-medium text-sm font-normal leading-tight">
        Must be at least 8 characters.
      </h3>

      <div className="relative mb-2">
        <label
          htmlFor="password"
          className="leading-7 text-sm text-label font-medium"
        >
          Confirm Password *
        </label>

        <Input.Password
          className="w-full bg-white px-3 py-2"
          size="large"
          placeholder="Password"
          label={"Password"}
          value={_this.formValue.confirmPassword}
          iconRender={(visible) =>
            visible ? <BsEye size={15} /> : <BsEyeSlash size={15} />
          }
          onChange={(e) => {
            _this.setFormValue((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }));
          }}
        />
      </div>

      <button
        onClick={() => _this.onChangePasswordSubmit()}
        className="mt-4 text-white bg-primary border-0 py-3 px-8 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
      >
        Reset Password
      </button>
      {/* 
      <h4 className="py-3 text-center text-gray-medium text-sm font-normal leading-tight">
        Didn’t receive the email?
       
          <span className="ml-2 text-blue-md text-sm font-medium">Click to resend</span>

      </h4> */}

      <Link
        className="flex items-center justify-center mt-8 my-2 text-gray-medium text-sm font-medium"
        to={"/login"}
      >
        <AiOutlineArrowLeft size={18} className="mr-2" />
        Back to Log in
      </Link>
    </div>
  );
};

export default ChangePassword;
