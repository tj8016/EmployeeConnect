import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Avatar, Card, Image, Dropdown } from "antd";
import { HiOutlineTrash } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
const { Meta } = Card;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Posts = ({ post, _this }) => {
  const items = [
    1 && {
      key: "edit-task",
      label: (
        <div
          className="flex items-center text-sm"
          // onClick={() => {
          //   _this.setEditMilestoneModalVisibility(true);
          //   _this.setEditMilestoneData((prev) => ({
          //     ...prev,
          //     milestone_id: milestone._id,
          //     update_obj: {
          //       title: milestone.title,
          //       description: milestone.description,
          //       status: milestone.status,
          //     },
          //     quickUpdates: milestone.quickUpdates || [],
          //   }));
          // }}
        >
          <AiOutlineEdit
            size={20}
            className="mr-2 flex justify-center items-center text-grayDark"
          />
          Edit
        </div>
      ),
    },
    1 && {
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

  return (
    <Card
      title={
        <div className="flex justify-between">
          <Meta
            avatar={
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
            }
            title={post?.owner?.first_name + " " + post?.owner?.last_name}
          />
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
        <div className="w-full flex justify-around py-1 mt-4">
          <div className="text-xl">
            <AiFillLike className="text-primary" />
          </div>
          <div className="text-xl">
            <AiFillLike />
          </div>
          <div className="text-xl">
            <AiFillLike />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Posts;
