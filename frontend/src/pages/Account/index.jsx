import React, { useState } from "react";
import Body from "./Body";
// import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, updateProfile } from "../../services/operations/authApi";
import toast from "react-hot-toast";

const Login = () => {
  // const router = useRoutes();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const onProfileUpdate = () => {
    // dispatch(updateProfile(userSkills, token, navigate));
  };

  /****************************** update Bio  **************************************/
  const [updateBioModalOpen, setUpdateBioModalOpen] = useState(false);

  /****************************** update Certificates **************************************/
  const [updateCertificatesModalOpen, setUpdateCertificatesModalOpen] =
    useState(false);

  /****************************** update skills **************************************/
  const [updateSkillModalOpen, setUpdateSkillModalOpen] = useState(false);
  const [skillinput, setSkillinput] = useState("");
  const [userSkills, setuserSkills] = useState([]);

  const onNewSkillAdd = () => {
    if (skillinput == "") return toast.error("skills can't be empty");
    setuserSkills([...userSkills, skillinput]);
    setSkillinput("");
  };

  const onSkillDelete = (val) => {
    setuserSkills(userSkills.filter((item) => item != val));
  };

  const _this = {
    formValue,
    setFormValue,
    onProfileUpdate,
    user,
    updateSkillModalOpen,
    setUpdateSkillModalOpen,
    updateBioModalOpen,
    setUpdateBioModalOpen,
    updateCertificatesModalOpen,
    setUpdateCertificatesModalOpen,
    skillinput,
    setSkillinput,
    userSkills,
    setuserSkills,
    onNewSkillAdd,
    onSkillDelete,
  };
  return <Body {..._this} />;
};

export default Login;
