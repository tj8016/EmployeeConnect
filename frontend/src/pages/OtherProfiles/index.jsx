import React, { useEffect, useState } from "react";
import Body from "./Body";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOtherProfile } from "../../services/operations/authApi";
import toast from "react-hot-toast";
import { setLoading } from "../../reducer/slices/authSlice";

const Login = () => {
  const params = useParams();
  // const router = useRoutes();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const onGetProfileDetails = () => {
    setLoading(true);
    getOtherProfile(token, { id: params.id })
      .then((response) => {
        setProfileDetails(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    onGetProfileDetails();
  }, [params.id]);

  const _this = {
    profileDetails,
    setProfileDetails,
    loading,
  };
  return <Body {..._this} />;
};

export default Login;
