import React from "react";
import { useSelector } from "react-redux";
import { Input, Modal, Avatar } from "antd";
import { PiUploadSimple } from "react-icons/pi";
import { TbCameraCancel } from "react-icons/tb";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UpdateBioModal = ({ _this }) => {
  const { user } = useSelector((state) => state.profile);
  const handleCancel = () => {
    _this?.setUpdateBioModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Update Avatar & Bio"
        open={_this?.updateBioModalOpen}
        onCancel={handleCancel}
        footer={
          <div>
            <button
              onClick={_this?.onBioAvatarUpdate}
              className="text-white bg-primary border-0 py-3 px-8 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
            >
              Save
            </button>
          </div>
        }
      >
        <div className="flex flex-col gap-y-3">
          <div className="py-3">
            <label
              htmlFor="bio"
              className="leading-7 text-sm text-label font-medium text-center"
            >
              Avatar
            </label>

            {_this?.avatar != null ? (
              <div className="w-full flex flex-col justify-center items-center gap-y-4 ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                <Avatar
                  className="h-32 w-32 border-0.5 border-gray-300"
                  src={_this?.avatar.preview}
                />
                <button
                  onClick={() => _this?.setavatar(null)}
                  className="flex items-center gap-x-1 text-white bg-primary border-0 py-2 px-3 focus:outline-none hover:bg-primary-dark rounded-md text-sm"
                >
                  Cancel
                  <TbCameraCancel className="text-lg" />
                </button>
              </div>
            ) : (
              <div className="w-full flex flex-col justify-center items-center gap-y-4 ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                <Avatar
                  className="h-32 w-32 border-0.5 border-gray-300"
                  src={`${
                    user?.avatar !== ""
                      ? BASE_URL + user?.avatar
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${_this?.user?.first_name}%20${_this?.user?.last_name}`
                  }`}
                />
                <div>
                  <label
                    htmlFor="avatar"
                    className="flex items-center gap-x-2 p-2 rounded-md hover:bg-primary/10 hover:text-primary bg-gray-100 transition-all duration-300 cursor-pointer"
                  >
                    <span className="font-light text-sm">Change</span>{" "}
                    <PiUploadSimple className="text-xl" />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg"
                    className="hidden justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-primary hover:bg-primary/10"
                    onChange={(e) => _this?.handleAvatar(e)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="pt-3">
            <label
              htmlFor="bio"
              className="leading-7 text-sm text-label font-medium"
            >
              Bio
            </label>

            <Input
              size="large"
              className="bg-white rounded-lg w-full"
              placeholder="Enter your bio"
              label={"bio"}
              value={_this?.formValue?.bio}
              onChange={(e) => {
                _this.setFormValue((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }));
              }}
            />
          </div>
          <div>
            <label
              htmlFor="phone_number"
              className="leading-7 text-sm text-label font-medium"
            >
              Phone Number
            </label>
            <Input
              size="large"
              className="bg-white rounded-lg w-full"
              placeholder="Enter your Phone number"
              label={"phone_number"}
              value={_this?.formValue?.phone_number}
              onChange={(e) => {
                _this.setFormValue((prev) => ({
                  ...prev,
                  phone_number: e.target.value,
                }));
              }}
            />
          </div>
          <div>
            <label
              htmlFor="location"
              className="leading-7 text-sm text-label font-medium"
            >
              Location
            </label>
            <Input
              size="large"
              className="bg-white rounded-lg w-full"
              placeholder="Enter your Location"
              label={"location"}
              value={_this?.formValue?.location}
              onChange={(e) => {
                _this.setFormValue((prev) => ({
                  ...prev,
                  location: e.target.value,
                }));
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UpdateBioModal;
