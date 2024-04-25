import React from "react";
import { Modal, Input, Image } from "antd";
import { RiImageAddLine } from "react-icons/ri";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const EditPostModal = ({ _this }) => {
  const uploadImageFile = (e) => {
    if (e.target.files.length > 0) {
      _this?.setEditPostImageFile({
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      });
    }
  };
  return (
    <>
      <Modal
        focus={false}
        centered={true}
        title="Edit Post"
        width={700}
        open={_this?.editPostModal}
        onCancel={() => _this?.setEditPostModal(false)}
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
                onChange={uploadImageFile}
              />
            </div>
            <button
              onClick={_this?.updatePostSubmit}
              className="text-white bg-primary border-0 py-2 px-8 focus:outline-none hover:bg-primary-dark rounded-lg text-base font-semibold"
            >
              Save
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
              value={_this?.editPostData?.caption}
              onChange={(e) => {
                _this.setEditPostData((prev) => ({
                  ...prev,
                  caption: e.target.value,
                }));
              }}
            ></textarea>
          </div>
          <div>
            {_this.editPostImageFile !== null && (
              <div className="flex justify-center">
                {_this?.editPostImageFile.preview ? (
                  <Image
                    width={700}
                    src={`${_this?.editPostImageFile.preview}`}
                    className="border"
                  />
                ) : (
                  <div>
                    {_this?.editPostImageFile != "" && (
                      <Image
                        width={700}
                        src={`${BASE_URL + _this?.editPostImageFile}`}
                        className="border"
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditPostModal;
