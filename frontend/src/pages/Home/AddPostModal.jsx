import React, { useState } from "react";
import { Modal, Input, Image } from "antd";
import { RiImageAddLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const { TextArea } = Input;

const AddPostModal = ({ _this }) => {
  const handleCancel = () => {
    _this?.setAddPostModal(false);
  };
  return (
    <>
      <Modal
        focus={false}
        title="Post"
        width={700}
        open={_this?.addPostModal}
        onCancel={handleCancel}
        footer={
          <div class="flex items-center justify-between px-3 py-2 border-t pt-5">
            <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
              <label
                for="imageInput"
                className="p-2 rounded-md hover:bg-primary/10 hover:text-primary bg-gray-100 transition-all duration-300 cursor-pointer"
              >
                <RiImageAddLine className="text-xl" />
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                class="hidden justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-primary hover:bg-primary/10"
                onChange={_this?.uploadImageFile}
              />
            </div>
            <button
              onClick={_this?.createPostSubmit}
              className="text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
            >
              Post
            </button>
          </div>
        }
      >
        <div className="py-5">
          <div class="px-4 py-2 bg-white rounded-t-lg">
            <label for="comment" class="sr-only">
              Your comment
            </label>
            <textarea
              id="caption"
              class="w-full px-0 text-sm border-0 focus:ring-0 outline-none"
              placeholder="Write you caption..."
              value={_this?.postData.caption}
              onChange={(e) => {
                _this.setPostData((prev) => ({
                  ...prev,
                  caption: e.target.value,
                }));
              }}
            ></textarea>
          </div>
          <div>
            {_this.postImageFile !== null && (
              <div className="relative group flex justify-center">
                <IoClose
                  onClick={() => _this?.setPostImageFile(null)}
                  className="absolute cursor-pointer z-40 text-xl text-white right-5 top-5 invisible group-hover:visible"
                />
                <Image
                  width={700}
                  src={_this?.postImageFile.preview}
                  className="border"
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddPostModal;
