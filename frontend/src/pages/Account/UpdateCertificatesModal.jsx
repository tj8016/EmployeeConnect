import React, { useState } from "react";
import { Button, Input, Modal, Space, Image } from "antd";
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
              onClick={_this?.onFilesUpdate}
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
            Choose a certificate
          </label>

          <Input
            size="large"
            type="file"
            className="bg-white rounded-lg w-full"
            placeholder="Enter your email address"
            label={"skill"}
            // value={_this?.imgfile}
            onChange={(e) => _this?.onNewFileAdd(e)}
          />

          <div className="flex flex-row items-center flex-wrap gap-2 pt-4">
            {_this?.files?.length > 0 &&
              _this?.files?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-medium text-lg font-normal border border-grayMedium px-3 py-2 rounded-lg relative"
                >
                  <Image width={200} src={item} />
                  <MdOutlineCancel
                    onClick={() => _this?.onFileDelete(item)}
                    size={35}
                    className="ml-3 bg-white p-0.5 text-red absolute top-0 right-0 cursor-pointer rounded-full border border-grayMedium"
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
