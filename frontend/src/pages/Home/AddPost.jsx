import React from "react";
import { Avatar, Card } from "antd";
const { Meta } = Card;

const AddPost = ({ _this }) => {
  return (
    <Card>
      <Meta
        title={
          <div className="flex items-center gap-4">
            <div className="w-max">
              <Avatar
                size={{
                  xs: 40,
                  sm: 40,
                  md: 45,
                  lg: 50,
                  xl: 55,
                  xxl: 70,
                }}
                src="https://res.cloudinary.com/dbvdqcii9/image/upload/v1692768405/My%20Portfolio/aboutimg_je6vny.jpg"
              />
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
