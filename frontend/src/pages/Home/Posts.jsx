import React from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import {
  Avatar,
  Card,
  Image,
  Dropdown,
  Collapse,
  theme,
  ConfigProvider,
} from "antd";
import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Posts = ({ post, _this }) => {
  const { user } = useSelector((state) => state.profile);
  const items = [
    user?._id === post?.owner._id && {
      key: "edit-task",
      label: (
        <div
          className="flex items-center text-sm"
          onClick={() => {
            _this.setEditPostModal(true);
            _this.setEditPostData((prev) => ({
              ...prev,
              _id: post?._id,
              caption: post?.caption,
            }));
            _this.setEditPostImageFile(`${post?.image_url}`);
          }}
        >
          <AiOutlineEdit
            size={20}
            className="mr-2 flex justify-center items-center text-grayDark"
          />
          Edit
        </div>
      ),
    },

    (user?.account_type === "Admin" || user?._id === post?.owner._id) && {
      key: "delete-task",
      label: (
        <div
          className="flex items-center text-secondary text-sm"
          onClick={() => {
            _this?.setDeletePostModal(true);
            _this.setDeletePostData(post);
          }}
        >
          <HiOutlineTrash
            size={20}
            className="mr-2 flex justify-center items-center text-secondary"
          />
          Delete
        </div>
      ),
    },
  ];

  const checkIsLike = () => {
    return post?.likes?.includes(user?._id);
  };

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const getItems = (panelStyle) => [
    {
      key: "1",
      label: `Comments (${post?.comments.length})`,
      children: (
        <div className="flex flex-col gap-y-2">
          {post?.comments.map((comment, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-md pl-3 py-2 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold">
                    {`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                    {post?.owner?._id === comment?.user?._id && (
                      <span className="ml-2 font-light text-xs bg-green-400/80 text-white rounded-full px-1">
                        Author
                      </span>
                    )}
                  </p>
                  <p className="text-sm font-light text-black/80">
                    {comment?.comment}
                  </p>
                </div>
                {(user?._id === comment?.user?._id ||
                  post?.owner?._id === user?._id) && (
                  <div>
                    <HiOutlineTrash
                      size={20}
                      className="mr-6 flex justify-center items-center text-secondary cursor-pointer"
                      onClick={() => {
                        _this?.setDeleteCommentModal(true);
                        _this?.setDeleteCommentData({
                          post_id: post._id,
                          comment_id: comment?._id,
                        });
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ),
      style: panelStyle,
    },
  ];
  return (
    <ConfigProvider
      theme={{
        token: {
          paddingLG: 16,
        },
      }}
    >
      <Card
        title={
          <div className="flex justify-between items-center h-10">
            {post?.owner?.avatar !== "" ? (
              <Link
                to={`/users/${post?.owner?._id}`}
                className="flex items-center gap-x-2"
              >
                <Avatar size={40} src={`${BASE_URL + post?.owner?.avatar}`} />
                <p>{post?.owner?.first_name + " " + post?.owner?.last_name}</p>
              </Link>
            ) : (
              <Link
                to={`/users/${post?.owner?._id}`}
                className="flex items-center gap-x-2"
              >
                <Avatar
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${post?.owner?.first_name}%20${post?.owner?.last_name}`}
                />
                <p>{post?.owner?.first_name + " " + post?.owner?.last_name}</p>
              </Link>
            )}
            {(user?.account_type === "Admin" ||
              user?._id === post?.owner?._id) && (
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  {/* <BsThreeDots size={20} className="text-cross" /> */}
                  <BsThreeDotsVertical size={20} className="text-cross" />
                </a>
              </Dropdown>
            )}
          </div>
        }
      >
        <div className="flex flex-col gap-y-3">
          <p>{post?.caption}</p>
          <div className="flex justify-center">
            {post?.image_url !== "" && (
              <Image
                className="object-cover"
                src={`${BASE_URL + post?.image_url}`}
              />
            )}
          </div>
          <div className="w-full flex justify-around py-1 mt-4 border-t pt-3">
            <button onClick={() => _this?.addOrRemoveLikeFunc(post?._id)}>
              <div className="text-2xl flex flex-col items-center gap-y-1">
                {checkIsLike() ? (
                  <FcLike className="text-primary" />
                ) : (
                  <FcLikePlaceholder />
                )}
                <p className="text-xs">Like {`(${post?.likes?.length})`}</p>
              </div>
            </button>

            <button
              onClick={() => _this?.setAddCommentModal(post?._id)}
              className="text-black/60 flex flex-col items-center gap-y-1 cursor-pointer"
            >
              <FaRegCommentDots className="text-2xl" />
              <p className="text-xs">Comment</p>
            </button>
          </div>
          <div>
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              style={{ background: token.colorBgContainer }}
              items={getItems(panelStyle)}
            />
          </div>
        </div>
      </Card>
    </ConfigProvider>
  );
};

export default Posts;
