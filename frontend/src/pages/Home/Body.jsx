import React from "react";
import Search from "./Search";
import Posts from "./Posts";
import AddPost from "./AddPost";
import AddPostModal from "./AddPostModal";
import DeletePostModal from "./DeletePostModal";
import EditPostModal from "./EditPostModal";
import AddCommentModal from "./AddCommentModal";

const Body = (_this) => {
  return (
    <>
      <div className="w-full flex justify-center min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-100px)]">
        <div className="flex flex-col w-11/12 sm:w-10/12 md:w-7/12 max-w-maxContent gap-y-8">
          <div className="w-full lg:w-9/12 mx-auto">
            <Search _this={_this} />
          </div>
          <div className="w-full flex justify-center">
            <div className="flex flex-col justify-center gap-y-4 w-full lg:w-9/12">
              <div className="w-full">
                <AddPost _this={_this} />
              </div>
              <div className="w-full flex flex-col gap-y-4">
                {_this?.allPostData.map((post) => {
                  return <Posts post={post} _this={_this} key={post?._id} />;
                })}
              </div>
            </div>
          </div>
        </div>
        {_this.addPostModal && <AddPostModal _this={_this} />}
        {_this.deletePostModal && <DeletePostModal _this={_this} />}
        {_this.editPostModal && <EditPostModal _this={_this} />}
        {_this.addCommentModal && <AddCommentModal _this={_this} />}
      </div>
    </>
  );
};

export default Body;
