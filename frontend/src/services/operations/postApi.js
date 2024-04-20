import toast from "react-hot-toast";
import { postEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const { CREATE_POST_API, GET_ALL_POST_API, DELETE_POST_API } = postEndpoints;

export const getAllPost = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_POST_API);
    if (response?.data?.error) {
      return toast.error(response?.data?.error);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_POST_API API ERROR............", error);
  }
  return result;
};

export const createPost = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_POST_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.error) {
      toast.dismiss(toastId);
      return toast.error(response?.data?.error);
    }
    toast.success("Post Added Successfully");
    result = response?.data;
  } catch (error) {
    console.log("CREATE_POST_API ERROR............", error);
  }
  toast.dismiss(toastId);
  return result;
};

export const deletePost = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector("DELETE", DELETE_POST_API, data, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    if (response?.data?.error) {
      toast.dismiss(toastId);
      return toast.error(response?.data?.error);
    }
    result = response?.data;
    toast.success("Post Deleted");
  } catch (error) {
    console.log("DELETE_POST_API ERROR............", error);
  }
  toast.dismiss(toastId);
  return result;
};
