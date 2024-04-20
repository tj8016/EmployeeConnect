import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Image as AntdImg, Input } from "antd";
import { MdOutlineCancel, MdOutlineEdit } from "react-icons/md";
import LoginImage from "../../assets/images/Login.jpg";
import Navbar from "../../components/common/Navbar";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProfileDetails = ({ _this }) => {
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
                  src={
                    _this.user?.avatar
                      ? `${BASE_URL + _this.user.avatar}`
                      : LoginImage
                  }
                />
                <div>
                  <h4 className="text-primary-text text-2xl font-bold text-wrap">
                    {_this?.user?.first_name} {_this?.user?.last_name}
                  </h4>
                  <h5 className="text-gray-medium text-lg font-normal py-1 break-all">
                    {_this?.user?.email}
                  </h5>
                  <h5 className="text-gray-medium text-lg font-normal">
                    {_this?.user?.bio}
                  </h5>
                </div>
                <MdOutlineEdit
                  onClick={(e) => {
                    e.preventDefault();
                    _this?.setUpdateBioModalOpen(true);
                    _this?.setUserBio(_this?.user?.bio);
                  }}
                  size={25}
                  className="absolute top-4 right-4 cursor-pointer"
                />
              </div>
              {/* skills section */}
              <div className="p-3 border border-grayLight rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-primary-text text-2xl font-bold mb-2">
                    Skills
                  </h4>
                  <MdOutlineEdit
                    onClick={(e) => {
                      e.preventDefault();
                      _this?.setUpdateSkillModalOpen(true);
                      _this?.setuserSkills(_this?.user?.skills);
                    }}
                    size={25}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex flex-row items-center flex-wrap gap-2">
                  {_this?.user?.skills?.length === 0 && (
                    <div className="w-full flex justify-center">
                      <p className="py-6">No skills added yet</p>
                    </div>
                  )}
                  {_this?.user?.skills?.length > 0 &&
                    _this?.user?.skills.map((item, index) => (
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
                  <MdOutlineEdit
                    onClick={(e) => {
                      e.preventDefault();
                      _this?.setUpdateCertificatesModalOpen(true);
                    }}
                    size={25}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex flex-row items-center flex-wrap gap-2">
                  {_this?.user?.certificates?.length > 0 &&
                    _this?.user?.certificates.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center text-gray-medium text-lg font-normal border border-grayMedium px-3 py-2 rounded-lg relative"
                      >
                        <AntdImg
                          src={`${BASE_URL + item?.img_url}`}
                          width={150}
                        />

                        <MdOutlineCancel
                          onClick={() => {
                            _this.setDeleteFileData(item.img_url);
                            _this.setDeleteCertificatesModalOpen(true);
                          }}
                          size={35}
                          className="ml-3 bg-white p-0.5 text-red absolute top-0 right-0 cursor-pointer rounded-full border border-grayMedium"
                        />
                      </div>
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

export default ProfileDetails;
