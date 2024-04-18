import React, { useState } from "react";
import { Button, Input, Modal, Space } from "antd";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

const UpdateCertificatesModal = ({ _this }) => {
  const handleCancel = () => {
    _this?.setUpdateCertificatesModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Update Certificates"
        open={_this?.updateCertificatesModalOpen}
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
            htmlFor="skill"
            className="leading-7 text-sm text-label font-medium"
          >
            Add a new Skill
          </label>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              size="large"
              className="bg-white rounded-lg"
              placeholder="Enter your email address"
              label={"skill"}
              value={_this?.skillinput}
              onChange={(e) => _this?.setSkillinput(e.target.value)}
            />
            <Button onClick={_this?.onNewSkillAdd} size="large">
              <AiOutlinePlusCircle size={25} />
            </Button>
          </Space.Compact>

          <div className="flex flex-row items-center flex-wrap gap-2 pt-4">
            {_this?.userSkills.length > 0 &&
              _this?.userSkills?.map((item) => (
                <div className="flex items-center text-gray-medium text-lg font-normal border border-grayMedium px-3 py-2 rounded-lg">
                  {item}
                  <MdOutlineCancel
                    onClick={() => _this?.onSkillDelete(item)}
                    size={24}
                    className="ml-3 text-grayMedium"
                  />
                </div>
              ))}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UpdateCertificatesModal;
