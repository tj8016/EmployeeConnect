const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
  SEND_OTP_API: BASE_URL + "/api/v1/user/send-otp",
  SIGNUP_API: BASE_URL + "/api/v1/user/register",
  LOGIN_API: BASE_URL + "/api/v1/user/login",
};

export const postEndpoints = {
  CREATE_POST_API: BASE_URL + "/api/v1/post/create-post",
  GET_ALL_POST_API: BASE_URL + "/api/v1/post/get-all-post",
  DELETE_POST_API: BASE_URL + "/api/v1/post/delete-post",
};
