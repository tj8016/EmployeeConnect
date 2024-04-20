import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Avatar, Card, Image } from "antd";
const { Meta } = Card;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Posts = ({ post }) => {
  return (
    <Card
      title={
        <Meta
          avatar={
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
          }
          title={post?.owner?.first_name + " " + post?.owner?.last_name}
        />
      }
    >
      <div className="flex flex-col gap-y-3">
        <p>{post?.caption}</p>
        <div className="flex justify-center">
          {post?.image_url !== "" && (
            <Image width={500} src={`${BASE_URL + post?.image_url}`} />
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
