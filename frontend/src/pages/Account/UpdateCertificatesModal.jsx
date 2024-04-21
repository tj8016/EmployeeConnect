import React, { useState } from "react";
import { Button, Input, Modal, Space, Image } from "antd";
import { PiUploadSimple } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

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
          <div className="w-full flex items-center justify-between px-3 py-2 border-t pt-5">
            <div className="w-full flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
              <label
                htmlFor="certificate_input"
                className="flex items-center gap-x-2 p-2 rounded-md hover:bg-primary/10 hover:text-primary bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                <span className="hidden sm:flex font-light text-sm">
                  Choose a certificate
                </span>{" "}
                <PiUploadSimple className="text-xl" />
              </label>
              <input
                id="certificate_input"
                type="file"
                accept="application/pdf,application/vnd.ms-excel"
                className="hidden justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-primary hover:bg-primary/10"
                onChange={(e) => _this?.onNewFileAdd(e)}
              />
            </div>
            <button
              onClick={_this?.onFilesUpdate}
              className="text-white bg-primary border-0 py-3 px-8 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
            >
              Save
            </button>
          </div>
        }
      >
        <div className="py-5 w-full ">
          <div className="w-full flex flex-row items-center flex-wrap gap-2 pt-4">
            <div className="w-full px-4 py-2 bg-white rounded-t-lg">
              <label htmlFor="certificate_title" className="sr-only">
                Your comment
              </label>
              <Input
                id="certificate_title"
                className="w-full px-0 text-sm focus:ring-0 "
                placeholder="Enter Certificate Title"
                value={_this?.certificateTitle?.certificate_title}
                onChange={(e) => {
                  _this.setCertificateTitle((prev) => ({
                    ...prev,
                    certificate_title: e.target.value,
                  }));
                }}
              />
            </div>
            {_this?.files && (
              <div className="flex items-center text-gray-medium text-lg font-normal  px-3 py-2 rounded-lg relative">
                <Image src={_this?.files?.preview} />
                <IoClose
                  onClick={() => _this?.onFileDelete()}
                  className="ml-3 text-red/85 absolute top-0 right-0 cursor-pointer text-xl"
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default UpdateCertificatesModal;
