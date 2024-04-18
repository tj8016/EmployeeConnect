import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { MdOutlineAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex w-full justify-center items-center z-[100]">
      <div className="w-full h-[65px] md:h-[70px] fixed top-0 bg-white shadow flex items-center justify-center">
        <div className=" flex w-11/12 sm:w-10/12 md:w-8/12 items-center justify-between md:justify-between">
          {/* Image */}
          <Link to="/">
            <p className="text-xl font-bold">Employee Connect</p>
          </Link>
          <div>
            {token && (
              <Link to="/account">
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
