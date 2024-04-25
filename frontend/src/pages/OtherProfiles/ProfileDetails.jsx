import React from "react";
import Navbar from "../../components/common/Navbar";
import { Avatar, List, Skeleton, Empty, Spin } from "antd";
import {
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineMailOutline,
  MdOutlinePhoneAndroid,
  MdLocationOn,
} from "react-icons/md";
import { GrFormView } from "react-icons/gr";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LoginForm = ({ _this }) => {
  return (
    <>
      <Navbar />
      <div className=" body-font py-4 flex flex-col lg:justify-between lg:flex-row min-h-[calc(100vh-90px)] bg-black/5">
        <div className="w-11/12 sm:w-11/12 lg:w-8/12 min-h-full p-4 px-6 flex flex-col mx-auto">
          {_this?.loading === true ? (
            <div className="w-full min-h-full flex justify-center items-center">
              <Spin />
            </div>
          ) : (
            <div className="w-full lg:w-11/12 mx-auto">
              <div className="w-full flex justify-between items-center py-5">
                <p className="text-2xl font-semibold">Profile</p>
              </div>
              <div className="h-full w-full">
                <div className="w-full h-full flex flex-col space-y-5">
                  {/* profile section */}
                  <div className="w-full flex items-stretch flex-col sm:items-center sm:flex-row gap-5 border border-grayLight rounded-lg p-3 relative bg-white">
                    <Avatar
                      className="min-h-24 min-w-24 sm:min-w-32 sm:min-h-32 border-0.5 border-gray-300"
                      src={
                        _this.profileDetails?.avatar
                          ? `${BASE_URL + _this.profileDetails.avatar}`
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${_this?.profileDetails?.first_name}%20${_this?.profileDetails?.last_name}`
                      }
                    />
                    <div className="w-full">
                      <h4 className="text-primary-text text-lg text-wrap">
                        {_this?.profileDetails?.first_name}{" "}
                        {_this?.profileDetails?.last_name}{" "}
                        <span className="text-sm bg-green-500 text-white py-0.5 px-2 rounded-full">
                          {_this?.profileDetails?.user_id}
                        </span>
                      </h4>
                      <div className="text-gray-medium text-sm font-normal py-1 break-all flex flex-col md:flex-row gap-2">
                        <p className="flex items-center gap-1">
                          <MdOutlineMailOutline />
                          {_this?.profileDetails?.email}
                        </p>
                        {_this?.profileDetails?.phone_number !== "" && (
                          <p className="flex items-center gap-1">
                            <MdOutlinePhoneAndroid />
                            {_this?.profileDetails?.phone_number}
                          </p>
                        )}
                        {_this?.profileDetails?.location !== "" && (
                          <p className="flex items-center gap-1">
                            <MdLocationOn />
                            {_this?.profileDetails?.location}
                          </p>
                        )}
                      </div>
                      <h5 className="text-gray-medium text-xs font-normal text-wrap break-words lg:w-10/12 py-2">
                        {_this?.profileDetails?.bio}
                      </h5>
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-8">
                    {/* skills section */}
                    <div className="p-3 border border-grayLight rounded-lg bg-white">
                      <div className="flex items-center justify-between border-b mb-3">
                        <h4 className="text-primary-text text-lg font-semibold mb-2">
                          Skills
                        </h4>
                      </div>
                      <div className="flex flex-row items-center flex-wrap gap-2">
                        {_this?.profileDetails?.skills?.length === 0 && (
                          <div className="w-full flex items-center justify-center">
                            <Empty
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                              description={<span>No Skills added yet</span>}
                            />
                          </div>
                        )}
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
                    <div className="p-3 border border-grayLight rounded-lg bg-white">
                      <div className="flex items-center justify-between border-b mb-3">
                        <h4 className="text-primary-text text-lg font-semibold mb-2">
                          Certificates
                        </h4>
                      </div>
                      <div>
                        {_this?.profileDetails?.certificates?.length === 0 && (
                          <div className="w-full flex items-center justify-center">
                            <Empty
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                              description={
                                <span>No Certificate added yet</span>
                              }
                            />
                          </div>
                        )}
                      </div>
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-center gap-x-8 gap-y-8">
                        {_this?.profileDetails?.certificates?.length > 0 &&
                          _this?.profileDetails?.certificates.map(
                            (item, index) => (
                              <div
                                key={index}
                                className="flex flex-col gap-y-3 border p-3"
                              >
                                <p className="text-sm font-semibold text-wrap">
                                  {item?.certificate_title}
                                </p>
                                <iframe
                                  src={`${BASE_URL + item?.certificate_url}`}
                                  frameborder="0"
                                  class="w-full  min-h-full"
                                />
                                <div className="flex justify-around">
                                  <a
                                    href={`${BASE_URL + item?.certificate_url}`}
                                    target="_blank"
                                    className="flex items-center gap-x-1 py-1 px-3 bg-primary text-white rounded-md"
                                  >
                                    View
                                    <GrFormView className="text-2xl" />
                                  </a>
                                </div>
                              </div>
                            )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginForm;
