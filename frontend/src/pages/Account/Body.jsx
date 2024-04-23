import React from "react";
import ProfileDetails from "./ProfileDetails";
import UpdateSkillsModal from "./UpdateSkillsModal";
import UpdateBioModal from "./UpdateBioModal";
import UpdateCertificatesModal from "./UpdateCertificatesModal";
import DeleteCertificatesModal from "./DeleteCertificateModal";
import DeleteUserModal from "./DeleteUserModal";

const Body = (_this) => {
  return (
    <>
      <ProfileDetails _this={_this} />
      <UpdateSkillsModal _this={_this} />
      <UpdateBioModal _this={_this} />
      <UpdateCertificatesModal _this={_this} />
      <DeleteCertificatesModal _this={_this} />
      {_this?.deleteUserModal && <DeleteUserModal _this={_this} />}
    </>
  );
};

export default Body;
