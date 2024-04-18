import React, { useState } from "react";
import Body from "./Body";
// import { useRoutes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/operations/authApi";

const Login = () => {
  // const router = useRoutes();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {
    dispatch(login(formValue, navigate));
  };

  const _this = {
    formValue,
    setFormValue,
    onLogin,
  };
  return <Body {..._this} />;
};

export default Login;
