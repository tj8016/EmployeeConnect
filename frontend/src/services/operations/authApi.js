import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import { setLoading, setToken } from "../../reducer/slices/authSlice";
import { setUser } from "../../reducer/slices/profileSlice";
import { ValidateEmail } from "../../utils";

const {
  SEND_OTP_API,
  SIGNUP_API,
  LOGIN_API,
  FORGOT_PASSWORD_API,
  RESEND_OTP_API,
  UpdateProfile_API,
  OtherProfile_API,
  CREATE_CERTIFICATE_API,
  DELETECERTIFICATE_API,
  UPDATE_SKILLS_API,
  GET_ALL_USERS_API,
  DELETE_USER_API,
} = authEndpoints;

export function sendOtp(data, setOtpReceived, setFormValue) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SEND_OTP_API, data);
      if (response?.data?.error) {
        toast.dismiss(toastId);
        return toast.error(response?.data?.error);
      }

      toast.success("OTP Sent Successfully");
      setOtpReceived(true);
      setFormValue({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        otp: "",
        account_type: "Employee",
      });
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        account_type: data.account_type,
        otp: data.otp,
      });
      if (response?.data?.error) {
        toast.dismiss(toastId);
        return toast.error(response?.data?.error);
      }
      toast.success("Signup Successful");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Failed to verify otp");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    navigate("/login");
  };
}

export function login(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email: data.email,
        password: data.password,
      });

      if (response?.data?.error) {
        toast.dismiss(toastId);
        return toast.error(response?.data?.error);
      }

      dispatch(setToken(response?.data?.data?.token));
      dispatch(setUser({ ...response?.data?.data }));
      localStorage.setItem(
        "EmployeConnect-token",
        JSON.stringify(response?.data?.data?.token)
      );
      localStorage.setItem(
        "EmployeConnect-user",
        JSON.stringify(response?.data?.data)
      ); // important
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    // dispatch(resetCart())
    localStorage.removeItem("EmployeConnect-token");
    localStorage.removeItem("EmployeConnect-user");
    toast.success("Logged Out");
    navigate("/");
  };
}

export const forgotPassword = async (data) => {
  const toastId = toast.loading("Loading...");
  let result = false;
  try {
    const response = await apiConnector("POST", FORGOT_PASSWORD_API, data);
    if (response?.data?.error) {
      toast.dismiss(toastId);
      toast.error(response?.data?.error);
      return result;
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("FORGOT_PASSWORD_API ERROR............", error);
  }
  toast.dismiss(toastId);
  return result;
};

export const resendOtp = async (data) => {
  const toastId = toast.loading("Loading...");
  let result = false;
  try {
    const response = await apiConnector("POST", RESEND_OTP_API, data);
    if (response?.data?.error) {
      toast.dismiss(toastId);
      toast.error(response.data.error);
      return result;
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("RESEND_OTP_API ERROR............", error);
  }
  toast.dismiss(toastId);
  return result;
};

export const getOtherProfile = async (token, data) => {
  let result = {};
  try {
    const response = await apiConnector("POST", OtherProfile_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.error) {
      return toast.error(response?.data?.error);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("get other profile API ERROR............", error);
  }
  return result;
};

export const getAllUser = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_USERS_API);
    if (response?.data?.error) {
      return toast.error(response?.data?.error);
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_USERS_API ERROR............", error);
  }
  return result;
};

export const deleteUser = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = false;
  try {
    const response = await apiConnector("DELETE", DELETE_USER_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (response?.data?.error) {
      toast.dismiss(toastId);
      return toast.error(response.data.error);
    }
    result = true;
    toast.success("User Deleted");
  } catch (error) {
    console.log("DELETE_USER_API ERROR............", error);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateBioAndAvatar = async (token, data) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", UpdateProfile_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.error) {
      throw new Error(response.data.error);
    }

    result = response?.data?.data;
    localStorage.setItem(
      "EmployeConnect-user",
      JSON.stringify(response?.data?.data)
    ); // important
    toast.success("Profile Updated");
  } catch (error) {
    console.log("UpdateBio API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateUserCertificates = async (token, data) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", CREATE_CERTIFICATE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.error) {
      throw new Error(response.data.error);
    }

    result = response?.data?.data;
    localStorage.setItem("EmployeConnect-user", JSON.stringify(result)); // important
    toast.success("Certificate Added");
  } catch (error) {
    console.log("CREATE_CERTIFICATE_API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteCertificate = async (token, data) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("DELETE", DELETECERTIFICATE_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.error) {
      throw new Error(response.data.error);
    }

    result = response?.data?.data;
    localStorage.setItem(
      "EmployeConnect-user",
      JSON.stringify(response?.data?.data)
    ); // important
    toast.success("Certificate Deleted");
  } catch (error) {
    console.log("delete certificates API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

export const updateUserSkills = async (token, data) => {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("POST", UPDATE_SKILLS_API, data, {
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.error) {
      toast.dismiss(toastId);
      return toast.error(response?.data?.error);
    }

    result = response?.data?.data;
    localStorage.setItem("EmployeConnect-user", JSON.stringify(result)); // important
    toast.success("Skills Updated");
  } catch (error) {
    console.log("UPDATE_SKILLS_API ERROR............", error);
  }
  toast.dismiss(toastId);
  return result;
};
