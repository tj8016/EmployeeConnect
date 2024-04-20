const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const authEndpoints = {
  SEND_OTP_API: BASE_URL + "/api/v1/user/send-otp",
  SIGNUP_API: BASE_URL + "/api/v1/user/register",
  LOGIN_API: BASE_URL + "/api/v1/user/login",
  UpdateProfile_API: BASE_URL + "/api/v1/user/update",
  OtherProfile_API: BASE_URL + "/api/v1/user/get-user",
};
