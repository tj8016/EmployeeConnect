import React from "react";
import { Link } from "react-router-dom";
import { Input, Select } from "antd";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import EnterOtp from "./EnterOtp";
import SmallHeader from "../../components/common/SmallHeader";
import { AiFillCheckCircle } from "react-icons/ai";

import SignUpImage from "../../assets/images/Signup.jpg";

const Body = ({ _this }) => {
  return (
    <>
      {_this.otpReceived === false ? (
        <div className="body-font py-4 flex flex-col lg:justify-between lg:flex-row min-h-screen lg:max-h-screen">
          <div className="w-full lg:basis-1/2 p-4 px-6 flex flex-col justify-between mx-auto">
            <div>
              <SmallHeader isLogin={true} />
              <div className="xs:w-full mt-5 py-4 w-4/5 mx-auto">
                <h2 className="text-center text-primary-text text-2xl font-semibold">
                  Create your FREE Employee account
                </h2>
                <div className="py-8 px-2 sm:p-8 flex flex-col w-full md:w-[70%] lg:w-full mx-auto mt-4">
                  <div className="relative mb-4">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-label font-medium"
                    >
                      First Name *
                    </label>

                    <Input
                      className="w-full bg-white px-3 py-2"
                      size="large"
                      placeholder="First Name"
                      label={"first_name"}
                      value={_this.formValue.first_name}
                      onChange={(e) => {
                        _this.setFormValue((prev) => ({
                          ...prev,
                          first_name: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="relative mb-4">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-label font-medium"
                    >
                      Last Name *
                    </label>

                    <Input
                      className="w-full bg-white px-3 py-2"
                      size="large"
                      placeholder="Last Name"
                      label={"last_name"}
                      value={_this.formValue.last_name}
                      onChange={(e) => {
                        _this.setFormValue((prev) => ({
                          ...prev,
                          last_name: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <div className="relative mb-4">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-label font-medium"
                    >
                      Email Address *
                    </label>

                    <Input
                      className="w-full bg-white px-3 py-2"
                      size="large"
                      placeholder="Email address"
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

                  <div className="relative mb-1">
                    <label
                      htmlFor="password"
                      className="leading-7 text-sm text-label font-medium"
                    >
                      Password *
                    </label>

                    <Input.Password
                      className="w-full bg-white px-3 py-2"
                      size="large"
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
                  <h3 className="mt-[2px] mb-4 text-gray-medium text-sm font-normal leading-tight">
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
                      value={_this.formValue.confirm_password}
                      iconRender={(visible) =>
                        visible ? <BsEye size={15} /> : <BsEyeSlash size={15} />
                      }
                      onChange={(e) => {
                        _this.setFormValue((prev) => ({
                          ...prev,
                          confirm_password: e.target.value,
                        }));
                      }}
                    />
                  </div>

                  <button
                    onClick={() => _this.onSignUp()}
                    className="mt-6 text-white bg-primary border-0 py-3 px-8 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
                  >
                    Get Started
                  </button>
                  <h4 className="py-4 text-center text-gray-medium text-sm font-normal leading-tight">
                    Already have an account?
                    <Link to={"/login"}>
                      <span className="ml-2 text-primary text-sm font-semibold">
                        Log In
                      </span>
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-contactBg min-h-full lg:basis-1/2 p-8 lg:rounded-tl-[56px] lg:rounded-bl-[56px] flex flex-col justify-center">
            <img
              className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] object-cover rounded-full m-auto"
              src={SignUpImage}
              alt="Signup image"
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
      ) : _this.otpReceived === true ? (
        <EnterOtp _this={_this} />
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-primary font-semibold">
            {" "}
            You're being redirected to dashboard!
          </h1>
        </div>
      )}
    </>
  );
};

export default Body;
