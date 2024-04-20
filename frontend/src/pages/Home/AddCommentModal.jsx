import React from "react";
import { Modal, Input, Space } from "antd";

const AddCommentModal = ({ post, _this }) => {
  return (
    <>
      <Modal
        title="Add Comment"
        centered={true}
        open={_this?.addCommentModal}
        onCancel={() => {
          _this.setAddCommentModal(false);
          _this.setCommentData({
            post_id: "",
            comment: "",
          });
        }}
        footer={<div></div>}
      >
        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder="Enter you Comment"
            value={_this?.commentData?.comment}
            onChange={(e) => {
              _this.setCommentData((prev) => ({
                ...prev,
                comment: e.target.value,
              }));
            }}
          />
          <button
            onClick={() => _this?.addCommentSubmit()}
            className="text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-primary-dark rounded-tr-lg rounded-br-lg text-base font-semibold"
          >
            Add
          </button>
        </Space.Compact>
      </Modal>
    </>
  );
};

export default AddCommentModal;
