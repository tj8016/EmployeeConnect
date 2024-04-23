import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar, List, Skeleton, Empty } from "antd";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import Navbar from "../../components/common/Navbar";
import { logout } from "../../services/operations/authApi";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ProfileDetails = ({ _this }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function getSmallString(text) {
    // var words = text.split(/\s+/);
    // return words.slice(0, 50).join(" ");
    return text.slice(0, 80);
  }
  return (
    <>
      <Navbar />
      <div className=" body-font py-4 flex flex-col lg:justify-between lg:flex-row min-h-[calc(100vh-65px)] bg-black/5">
        <div className="w-11/12 sm:w-11/12 md:w-8/12 h-full p-4 px-6 flex flex-col mx-auto">
          <div className="w-full lg:w-11/12 mx-auto">
            <div className="w-full flex justify-between items-center py-5">
              <p className="text-2xl font-semibold">Profile</p>
              <button
                onClick={() => dispatch(logout(navigate))}
                className="flex items-center gap-x-1 py-2 px-3 bg-primary text-white rounded-lg"
              >
                Logout <BiLogOut className="text-xl" />
              </button>
            </div>
            <div className="h-full w-full">
              <div className="w-full h-full flex flex-col space-y-5">
                {/* profile section */}
                <div className="w-full flex items-stretch flex-col sm:items-center sm:flex-row gap-5 border border-grayLight rounded-lg p-3 relative bg-white">
                  <Avatar
                    className="min-h-24 min-w-24 sm:min-w-32 sm:min-h-32 border-0.5 border-gray-300"
                    src={
                      _this.user?.avatar
                        ? `${BASE_URL + _this.user.avatar}`
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${_this?.user?.first_name}%20${_this?.user?.last_name}`
                    }
                  />
                  <div className="w-full">
                    <h4 className="text-primary-text text-lg text-wrap">
                      {_this?.user?.first_name} {_this?.user?.last_name}{" "}
                      <span className="text-sm bg-green-500 text-white py-0.5 px-2 rounded-full">
                        {_this?.user?.user_id}
                      </span>
                    </h4>
                    <h5 className="text-gray-medium text-sm font-normal py-1 break-all">
                      {_this?.user?.email}
                    </h5>
                    <h5 className="text-gray-medium text-xs font-normal text-wrap break-words lg:w-10/12">
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
                {_this?.user?.account_type === "Employee" && (
                  <div className="flex flex-col gap-y-8">
                    {/* skills section */}
                    <div className="p-3 border border-grayLight rounded-lg bg-white">
                      <div className="flex items-center justify-between border-b mb-3">
                        <h4 className="text-primary-text text-lg font-semibold mb-2">
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
                          <div className="w-full flex items-center justify-center">
                            <Empty
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                              description={<span>No Skills added yet</span>}
                            />
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
                    <div className="p-3 border border-grayLight rounded-lg bg-white">
                      <div className="flex items-center justify-between border-b mb-3">
                        <h4 className="text-primary-text text-lg font-semibold mb-2">
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
                      <div>
                        {_this?.user?.certificates?.length === 0 && (
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
                        {_this?.user?.certificates?.length > 0 &&
                          _this?.user?.certificates.map((item, index) => (
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
                                <button
                                  className="flex items-center gap-x-1 py-1 px-3 bg-primary text-white rounded-md"
                                  onClick={() => {
                                    _this.setDeleteFileData(item._id);
                                    _this.setDeleteCertificatesModalOpen(true);
                                  }}
                                >
                                  Delete
                                  <MdDeleteOutline className="text-xl" />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
                {_this?.user?.account_type === "Admin" && (
                  <div className="py-3 px-4 bg-white border rounded-md ">
                    <List
                      className="demo-loadmore-list"
                      itemLayout="horizontal"
                      dataSource={_this?.allUsersData}
                      renderItem={(user) => (
                        <div className="hover:bg-black/5 px-3 py-2 rounded-md">
                          <List.Item
                            actions={[
                              <button
                                key="list-loadmore-edit"
                                className="bg-primary text-white px-2 py-1 rounded-sm"
                                onClick={() => {
                                  _this?.setDeleteUserData(user?._id);
                                  _this?.setDeleteUserModal(true);
                                }}
                              >
                                Delete
                              </button>,
                            ]}
                          >
                            <Skeleton
                              avatar
                              title={false}
                              loading={user.loading}
                              active
                            >
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    src={
                                      user?.avatar !== ""
                                        ? `${BASE_URL + user?.avatar}`
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.first_name}%20${user?.last_name}`
                                    }
                                  />
                                }
                                title={
                                  <p>
                                    {user?.first_name + " " + user?.last_name}
                                  </p>
                                }
                                // description={getSmallString(user?.bio)}
                              />
                            </Skeleton>
                          </List.Item>
                        </div>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDetails;
