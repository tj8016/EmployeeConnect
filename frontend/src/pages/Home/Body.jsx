import React from "react";
import Search from "./Search";
import Posts from "./Posts";

const Body = () => {
  return (
    <>
      <div className="w-full flex justify-center min-h-[calc(100vh-125px)] md:min-h-[calc(100vh-90px)]">
        <div className="flex flex-col w-11/12 sm:w-10/12 md:w-7/12 max-w-maxContent gap-y-8">
          <div>
            <Search />
          </div>
          <div className="flex justify-center">
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
