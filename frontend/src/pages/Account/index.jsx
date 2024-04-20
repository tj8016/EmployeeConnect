import React, { useState } from "react";
import Body from "./Body";
// import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  login,
  updateBioAndAvatar,
  updateUserCertificates,
  updateUserSkills,
} from "../../services/operations/authApi";
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
    // updateBioAndAvatar(token, { bio: userBio });
    // .then((response) => {
    //   if (response) {
    //     if (response.otp) {
    //       setOtpReceived(true);
    //       //dispatch(signup(response));
    //       toast.success('OTP has been set to your email account.');
    //     }
    //   }
    // })
    // .finally(() => {
    //   dispatch(loadingStop());
    // });
    // dispatch(updateProfile(userSkills, token, navigate));
  };

  /****************************** update Bio  **************************************/

  const [updateBioModalOpen, setUpdateBioModalOpen] = useState(false);
  const [userBio, setUserBio] = useState("");

  const onBioAvatarUpdate = () => {
    updateBioAndAvatar(token, { avatar, bio: userBio })
      .then((response) => {
        if (response) {
          setUpdateBioModalOpen(false);
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  /****************************** update Certificates **************************************/
  const [updateCertificatesModalOpen, setUpdateCertificatesModalOpen] =
    useState(false);
  const [files, setFiles] = useState([]);
  const [avatar, setavatar] = useState(null);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      setavatar(Reader?.result);
    };
  };

  const onNewFileAdd = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      setFiles([...files, Reader.result]);
    };
  };

  const onFileDelete = (val) => {
    setFiles(files.filter((item) => item != val));
  };

  const onFilesUpdate = () => {
    updateUserCertificates(token, { files })
      .then((response) => {
        if (response) {
          setUpdateCertificatesModalOpen(false);
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

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

  const onSkillsUpdate = () => {
    updateUserSkills(token, { skills: userSkills })
      .then((response) => {
        if (response) {
          setUpdateSkillModalOpen(false);
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  const _this = {
    user,
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
    onBioAvatarUpdate,
    userBio,
    setUserBio,
    onSkillsUpdate,
    files,
    setFiles,
    onNewFileAdd,
    onFileDelete,
    onFilesUpdate,
    handleAvatar,
    avatar,
    setavatar,
  };
  return <Body {..._this} />;
};

export default Login;
