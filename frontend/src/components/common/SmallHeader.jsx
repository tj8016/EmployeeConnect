import { Link } from "react-router-dom";
import React from "react";

const SmallHeader = ({ isLogin = false, disableLinks = false }) => {
  return (
    <div className="flex items-center justify-between">
      <Link
        aria-disabled={disableLinks}
        className={`${disableLinks && "pointer-events-none"}`}
        to={"/"}
      >
        <p className="text-xl font-bold">Employee Connect</p>
      </Link>

      {isLogin === false && (
        <Link to={"/sign-up"}>
          <span className="text-primary text-base font-semibold underline underline-offset-4">
            Sign Up
          </span>
        </Link>
      )}
      {isLogin && (
        <Link
          aria-disabled={disableLinks}
          className={`${disableLinks && "pointer-events-none"}`}
          to={"/login"}
        >
          <span className="text-primary text-base font-semibold underline underline-offset-4">
            Log In
          </span>
        </Link>
      )}
    </div>
  );
};

export default SmallHeader;
