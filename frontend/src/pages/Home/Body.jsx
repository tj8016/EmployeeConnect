import React from "react";
import Search from "./Search";
import Posts from "./Posts";
import AddPost from "./AddPost";
import AddPostModal from "./AddPostModal";

const Body = (_this) => {
  return (
    <>
      <div className="w-full flex justify-center min-h-[calc(100vh-125px)] md:min-h-[calc(100vh-90px)]">
        <div className="flex flex-col w-11/12 sm:w-10/12 md:w-7/12 max-w-maxContent gap-y-8">
          <div>
            <Search />
          </div>
          <div className="w-full flex justify-center">
            <div className="flex flex-col justify-center gap-y-4 md:w-8/12">
              <AddPost _this={_this} />
              <div className="flex flex-col gap-y-4">
                {_this?.allPostData.map((post) => {
                  return <Posts post={post} />;
                })}
              </div>
            </div>
          </div>
        </div>
        {_this.addPostModal && <AddPostModal _this={_this} />}
      </div>
    </>
  );
};

export default Body;
