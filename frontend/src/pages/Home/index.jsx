import React from "react";
import Body from "./Body";
import Navbar from "../../components/common/Navbar";

const Home = () => {
  const _this = {};
  return (
    <>
      <Navbar />
      <div className={`mt-[80px]`}>
        <Body {..._this} />
      </div>
    </>
  );
};

export default Home;
