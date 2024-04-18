import React, { useState } from "react";
import { Button, Input, Modal, Space } from "antd";
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
              onClick={_this?.onProfileUpdate()}
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

          <Input
            size="large"
            type="file"
            className="bg-white rounded-lg w-full"
            placeholder="Choose your avatar"
            label={"bio"}
            // value={_this?.skillinput}
            // onChange={(e) => _this?.setSkillinput(e.target.value)}
          />
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
            placeholder="Enter your email address"
            label={"bio"}
            // value={_this?.skillinput}
            // onChange={(e) => _this?.setSkillinput(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};
export default UpdateBioModal;
