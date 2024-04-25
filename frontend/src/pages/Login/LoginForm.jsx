import React from "react";
import { Link } from "react-router-dom";
import { Input } from "antd";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import SmallHeader from "../../components/common/SmallHeader";

import LoginImage from "../../assets/images/Login.jpg";

const LoginForm = ({ _this }) => {
  return (
    <div className=" body-font py-4 flex flex-col lg:justify-between lg:flex-row min-h-screen">
      <div className="w-full h-full lg:basis-1/2 p-4 px-6 flex flex-col mx-auto">
        <div className="h-full">
          <SmallHeader />
          <div className="h-full flex">
            <div className="xs:w-full mt-8 py-6 w-4/5 mx-auto h-full">
              <h2 className="text-center text-primary-text text-3xl font-semibold mb-3">
                Welcome!
              </h2>
              <h4 className="text-center text-gray-medium text-base font-normal">
                Sign in to your account
              </h4>
              <div className="py-8 px-2 sm:p-8 flex flex-col w-full md:w-[70%] lg:w-full mx-auto mt-4">
                <div className="relative mb-8">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-label font-medium"
                  >
                    Email Address*
                  </label>
                  <Input
                    size="large"
                    className="w-full bg-white rounded-lg py-2 px-3"
                    placeholder="Enter your email address"
                    label={"email"}
                    onChange={(e) => {
                      _this.setFormValue((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="relative mb-7">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-label font-medium"
                  >
                    Password*
                  </label>

                  <Input.Password
                    size="large"
                    className="w-full bg-white rounded-lg py-2 px-3"
                    placeholder="Enter your password"
                    label={"Password"}
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
                  <Link to={"/forgot-password"}>
                    <h3 className="text-end text-primary text-sm font-medium leading-tight cursor-pointer mt-1">
                      Forgot password
                    </h3>
                  </Link>
                </div>

                <button
                  onClick={() => {
                    _this.onLogin();
                  }}
                  className="text-white bg-primary border-0 py-3 px-8 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
                >
                  Log In
                </button>
                <h4 className="py-3 text-center text-gray-medium text-sm font-normal leading-tight">
                  Don’t have an account?{" "}
                  <Link to={"/sign-up"}>
                    <span className="ml-2 text-primary text-sm font-semibold">
                      Sign Up
                    </span>
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-contactBg min-h-full lg:basis-1/2 p-8 lg:rounded-tl-[56px] lg:rounded-bl-[56px] flex flex-col justify-center">
        <img
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] object-cover rounded-full m-auto"
          src={LoginImage}
          alt="login image"
        />
        <div className="flex flex-col py-8 gap-2">
          <div>
            <h4 className="text-primary-text text-4xl font-bold mb-2">
              Employee Unite
            </h4>
            <h5 className="text-gray-medium text-lg font-normal">
              Empowering professionals to showcase skills and celebrate
              achievements effortlessly.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
