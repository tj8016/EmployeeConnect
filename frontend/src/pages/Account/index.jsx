import React, { useEffect, useState } from "react";
import Body from "./Body";
// import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCertificate,
  login,
  updateBioAndAvatar,
  updateUserCertificates,
  updateUserSkills,
} from "../../services/operations/authApi";
import toast from "react-hot-toast";
import { setUser } from "../../reducer/slices/profileSlice";

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
  const [avatar, setavatar] = useState(null);

  const onBioAvatarUpdate = () => {
    const formData = new FormData();
    formData.append("avatar", avatar?.data);
    formData.append("bio", userBio);
    formData.append("oldpic", user?.avatar);
    updateBioAndAvatar(token, formData)
      .then((response) => {
        if (response) {
          setUpdateBioModalOpen(false);
          dispatch(setUser(response));
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  const handleAvatar = (e) => {
    if (e.target.files.length > 0) {
      setavatar({
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      });
    }
  };

  /****************************** update Certificates **************************************/
  const [updateCertificatesModalOpen, setUpdateCertificatesModalOpen] =
    useState(false);
  const [DeleteCertificatesModalOpen, setDeleteCertificatesModalOpen] =
    useState(false);
  const [deleteFileData, setDeleteFileData] = useState(null);
  const [files, setFiles] = useState([]);

  const onNewFileAdd = (e) => {
    if (e.target.files.length > 0) {
      setFiles([
        ...files,
        {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        },
      ]);
    }
  };

  const onFileDelete = (val) => {
    setFiles(files.filter((item) => item?.data != val));
  };

  const onFilesUpdate = () => {
    const formData = new FormData();
    for (let item of files) {
      formData.append("imgFiles", item.data);
    }

    updateUserCertificates(token, formData)
      .then((response) => {
        if (response) {
          setUpdateCertificatesModalOpen(false);
          dispatch(setUser(response));
          setFiles([]);
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  const DeleteCertificate = () => {
    deleteCertificate(token, { file: deleteFileData })
      .then((response) => {
        if (response) {
          setDeleteCertificatesModalOpen(false);
          setDeleteFileData(null);
          dispatch(setUser(response));
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
          dispatch(setUser(response));
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
    setDeleteCertificatesModalOpen,
    DeleteCertificatesModalOpen,
    setDeleteFileData,
    DeleteCertificate,
  };
  return <Body {..._this} />;
};

export default Login;
