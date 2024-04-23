import React from "react";
import { Modal } from "antd";
import { IoWarningOutline } from "react-icons/io5";

const DeleteUserModal = ({ _this }) => {
  return (
    <>
      <Modal
        title="Delete Post"
        open={_this?.deleteUserModal}
        onCancel={() => _this?.setDeleteUserModal(false)}
        width={400}
        centered={true}
        footer={
          <div>
            <button
              onClick={_this?.deleteUserSubmit}
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

export default DeleteUserModal;
