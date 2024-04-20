import React, { useState } from "react";
import { Button, Image, Input, Modal, Space } from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

const UpdateBioModal = ({ _this }) => {
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
            className="leading-7 text-sm text-label font-medium"
          >
            Avatar
          </label>

          {_this?.avatar != null ? (
            <div className="w-40 flex items-center text-gray-medium text-lg font-normal border border-grayMedium px-3 py-2 rounded-lg relative">
              <Image width={150} src={_this?.avatar} />
              <MdOutlineCancel
                onClick={() => _this?.setavatar(null)}
                size={35}
                className="ml-3 bg-white p-0.5 text-red absolute top-0 right-0 cursor-pointer rounded-full border border-grayMedium"
              />
            </div>
          ) : (
            <Input
              size="large"
              type="file"
              className="bg-white rounded-lg w-full"
              placeholder="Choose your avatar"
              label={"bio"}
              // value={_this?.userBio}
              onChange={(e) => _this?.handleAvatar(e)}
            />
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
