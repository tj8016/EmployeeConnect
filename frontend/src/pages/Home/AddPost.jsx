import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Card } from "antd";
const { Meta } = Card;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddPost = ({ _this }) => {
  const { user } = useSelector((state) => state.profile);
  return (
    <Card>
      <Meta
        title={
          <div className="flex items-center gap-4">
            <div className="w-max">
              {user?.avatar !== "" ? (
                <Avatar size={40} src={`${BASE_URL + user?.avatar}`} />
              ) : (
                <Avatar
                  size={40}
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${user?.first_name}%20${user?.last_name}`}
                />
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                _this?.setAddPostModal(true);
              }}
              className="w-full h-full text-sm font-light py-2 px-3 border rounded-full cursor-pointer hover:bg-black/5"
            >
              Start Posts
            </button>
          </div>
        }
      />
    </Card>
  );
};

export default AddPost;
