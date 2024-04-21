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
        <div className="py-5">
          <label
            htmlFor="bio"
            className="leading-7 text-sm text-label font-medium text-center"
          >
            Avatar
          </label>

          {_this?.avatar != null ? (
            <div className="w-full flex flex-col gap-y-2 justify-center items-center text-gray-medium text-lg font-normal px-3 py-2 rounded-lg relative">
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
                src={`${BASE_URL + user?.avatar}`}
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
        <div className="py-5">
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
            value={_this?.userBio}
            onChange={(e) => _this?.setUserBio(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
export default UpdateBioModal;
