import React from "react";
import { FaRegCommentDots } from "react-icons/fa6";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Avatar, Card, Image, Dropdown } from "antd";
import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, theme, ConfigProvider } from "antd";
const { Meta } = Card;
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
      label: "Comments",
      children: <div>hello</div>,
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
          <div className="flex justify-between">
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title={post?.owner?.first_name + " " + post?.owner?.last_name}
            />
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
              <Image src={`${BASE_URL + post?.image_url}`} />
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
                <p className="text-xs">Like</p>
              </div>
            </button>

            <div className="text-black/60 flex flex-col items-center gap-y-1">
              <FaRegCommentDots className="text-2xl" />
              <p className="text-xs">Comment</p>
            </div>
          </div>
          <div>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
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
