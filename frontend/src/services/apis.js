const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
  SEND_OTP_API: BASE_URL + "/api/v1/user/send-otp",
  SIGNUP_API: BASE_URL + "/api/v1/user/register",
  LOGIN_API: BASE_URL + "/api/v1/user/login",
  FORGOT_PASSWORD_API: BASE_URL + "/api/v1/user/forgot-password",
  RESEND_OTP_API: BASE_URL + "/api/v1/user/resend-otp",
  UpdateProfile_API: BASE_URL + "/api/v1/user/update",
  DELETE_USER_API: BASE_URL + "/api/v1/user/delete-user",
  UPDATE_SKILLS_API: BASE_URL + "/api/v1/user/update-skills",
  OtherProfile_API: BASE_URL + "/api/v1/user/get-user",
  CREATE_CERTIFICATE_API: BASE_URL + "/api/v1/user/create-certificate",
  DELETECERTIFICATE_API: BASE_URL + "/api/v1/user/delete-certificate",
  GET_ALL_USERS_API: BASE_URL + "/api/v1/user/get-all-users",
};

export const postEndpoints = {
  CREATE_POST_API: BASE_URL + "/api/v1/post/create-post",
  UPDATE_POST_API: BASE_URL + "/api/v1/post/update-post",
  GET_ALL_POST_API: BASE_URL + "/api/v1/post/get-all-post",
  DELETE_POST_API: BASE_URL + "/api/v1/post/delete-post",
  ADD_REMOVE_LIKE_API: BASE_URL + "/api/v1/post/like-or-unlike-a-post",
  ADD_COMMENT_API: BASE_URL + "/api/v1/post/comment-in-a-post",
  DELETE_COMMENT_API: BASE_URL + "/api/v1/post/delete-comment-of-a-post",
};
