import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Image, Input } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import SmallHeader from "../../components/common/SmallHeader";

import LoginImage from "../../assets/images/Login.jpg";
import Navbar from "../../components/common/Navbar";

const LoginForm = ({ _this }) => {
  return (
    <>
      <Navbar />
      <div className=" body-font py-4 flex flex-col lg:justify-between lg:flex-row min-h-screen">
        <div className="w-11/12 sm:w-10/12 md:w-8/12 h-full p-4 px-6 flex flex-col mx-auto">
          <div className="h-full">
            <div className="h-full flex flex-col space-y-5">
              {/* profile section */}
              <div className="flex items-stretch flex-col sm:items-center sm:flex-row gap-5 border border-grayLight rounded-lg p-3 relative">
                <Avatar
                  className="h-32 w-32 border-0.5 border-gray-300"
                  src={_this?.profileDetails?.avatar?.avatar_url ?? LoginImage}
                />
                <div>
                  <h4 className="text-primary-text text-2xl font-bold text-wrap">
                    {_this?.profileDetails?.first_name}{" "}
                    {_this?.profileDetails?.last_name}
                  </h4>
                  <h5 className="text-gray-medium text-lg font-normal py-1 break-all">
                    {_this?.profileDetails?.email}
                  </h5>
                  <h5 className="text-gray-medium text-lg font-normal">
                    {_this?.profileDetails?.bio}
                  </h5>
                </div>
              </div>
              {/* skills section */}
              <div className="p-3 border border-grayLight rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-primary-text text-2xl font-bold mb-2">
                    Skills
                  </h4>
                </div>
                <div className="flex flex-row items-center flex-wrap gap-2">
                  {_this?.profileDetails?.skills?.length > 0 &&
                    _this?.profileDetails?.skills.map((item, index) => (
                      <h5
                        key={index}
                        className="text-gray-medium text-lg font-normal border border-grayMedium px-3 py-2 rounded-lg"
                      >
                        {item}
                      </h5>
                    ))}
                </div>
              </div>

              {/* certificate section */}
              <div className="p-3 border border-grayLight rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-primary-text text-2xl font-bold mb-2">
                    Certificates
                  </h4>
                </div>
                <div className="flex flex-row items-center flex-wrap gap-2">
                  {_this?.profileDetails?.certificates?.length > 0 &&
                    _this?.profileDetails?.certificates.map((item, index) => (
                      <Image key={index} width={100} src={item.avatar_url} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
