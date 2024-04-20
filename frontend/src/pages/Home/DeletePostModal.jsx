import React from "react";
import { Modal } from "antd";
import { IoWarningOutline } from "react-icons/io5";

const DeletePostModal = ({ _this }) => {
  return (
    <>
      <Modal
        title="Delete Post"
        open={_this?.deletePostModal}
        onCancel={() => _this?.setDeletePostModal(false)}
        width={400}
        centered={true}
        footer={
          <div>
            <button
              onClick={_this?.deletePostSubmit}
              className="text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
            >
              Delete
            </button>
          </div>
        }
      >
        <div className="flex items-center justify-center gap-x-2 py-4">
          <IoWarningOutline className="text-xl text-red" />
          Are you sure you want to delete ?
        </div>
      </Modal>
    </>
  );
};

export default DeletePostModal;
