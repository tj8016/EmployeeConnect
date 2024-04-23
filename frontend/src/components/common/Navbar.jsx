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
    <div className="flex w-full justify-center items-center z-[100] mb-16">
      <div className="w-full h-[70px] fixed top-0 bg-white shadow flex items-center justify-center">
        <div className=" flex w-11/12 sm:w-10/12 md:w-8/12 xl:w-7/12 items-center justify-center">
          <div className="flex w-full xl:w-9/12 items-center justify-between md:justify-between">
            {/* Image */}
            <Link to="/">
              <p className="text-xl font-bold text-[#334155]">
                <span className="text-primary text-2xl">E</span>mployee{" "}
                <span className="text-primary text-2xl">C</span>onnect
              </p>
            </Link>
            <div>
              {token && (
                <Link to="/account">
                  <div className="flex items-center gap-x-2">
                    <p className="text-sm font-light">
                      {user?.first_name + " " + user?.last_name}
                    </p>
                    <Avatar
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
