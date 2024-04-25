import React, { useEffect, useState } from "react";
import Body from "./Body";
// import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteCertificate,
  deleteUser,
  getAllUser,
  updateBioAndAvatar,
  updateUserCertificates,
  updateUserSkills,
} from "../../services/operations/authApi";
import toast from "react-hot-toast";
import { setUser } from "../../reducer/slices/profileSlice";

const Account = () => {
  // const router = useRoutes();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  /****************************** update Bio  **************************************/

  const [updateBioModalOpen, setUpdateBioModalOpen] = useState(false);
  const [formValue, setFormValue] = useState({
    bio: "",
    phone_number: "",
    location: "",
  });
  const [userBio, setUserBio] = useState("");
  const [avatar, setavatar] = useState(null);

  const onBioAvatarUpdate = () => {
    const formData = new FormData();
    console.log(formValue);
    formData.append("avatar", avatar?.data);
    formData.append("bio", formValue?.bio);
    formData.append("phone_number", formValue?.phone_number);
    formData.append("location", formValue?.location);
    updateBioAndAvatar(token, formData)
      .then((response) => {
        if (response) {
          setUpdateBioModalOpen(false);
          setavatar(null);
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
  const [files, setFiles] = useState({
    preview: "",
    data: "",
  });
  const [certificateTitle, setCertificateTitle] = useState({
    certificate_title: "",
  });
  const [allUsersData, setAllUsersData] = useState([]);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [deleteUserData, setDeleteUserData] = useState(null);

  const onNewFileAdd = (e) => {
    if (e.target.files.length > 0) {
      setFiles((prev) => ({
        ...prev,
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      }));
    }
  };

  const onFileDelete = () => {
    setFiles({
      preview: "",
      data: "",
    });
  };

  const onFilesUpdate = () => {
    if (files === null) return toast.error("Upload Certificate First");
    if (certificateTitle?.certificate_title == "") {
      return toast.error("Title is Required");
    }
    const formData = new FormData();
    formData.append("certificate_title", certificateTitle?.certificate_title);
    formData.append("certificateFile", files?.data);

    updateUserCertificates(token, formData)
      .then((response) => {
        if (response) {
          setUpdateCertificatesModalOpen(false);
          dispatch(setUser(response));
          setFiles(null);
          setCertificateTitle({
            certificate_title: "",
          });
          setFiles({
            preview: "",
            data: "",
          });
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  const DeleteCertificate = () => {
    deleteCertificate(token, { certificate_id: deleteFileData })
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

  const getAllUsersData = async () => {
    getAllUser()
      .then((response) => {
        if (response) {
          setAllUsersData(response);
        }
      })
      .finally(() => {
        // dispatch(loadingStop());
      });
  };

  const deleteUserSubmit = async () => {
    const data = {
      user_id: deleteUserData,
    };
    deleteUser(data, token)
      .then((response) => {
        if (response) {
          setDeleteUserData(null);
          setDeleteUserModal(false);
          getAllUsersData();
        }
      })
      .finally(() => {});
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const _this = {
    user,
    allUsersData,
    setAllUsersData,
    formValue,
    setFormValue,
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
    certificateTitle,
    setCertificateTitle,
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
    deleteUserModal,
    setDeleteUserModal,
    deleteUserData,
    setDeleteUserData,
    deleteUserSubmit,
  };
  return <Body {..._this} />;
};

export default Account;
