import React from "react";
import Body from "./Body";
import Navbar from "../../components/common/Navbar";

const Home = () => {
  const _this = {};
  return (
    <>
      <Navbar />
      <div className={`mt-[65px] md:mb-[65px]`}>
        <Body {..._this} />
      </div>
    </>
  );
};

export default Home;
