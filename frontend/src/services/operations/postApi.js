import toast from "react-hot-toast";
import { postEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const { CREATE_POST_API, GET_ALL_POST_API } = postEndpoints;

export const getAllPost = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_POST_API);
    if (response?.data?.error) {
      return toast.error(response?.data?.error);
    }
    result = response?.data?.data;
    console.log(result);
  } catch (error) {
    console.log("GET_ALL_POST_API API ERROR............", error);
  }
  return result;
};

export const createPost = async (
  data,
  token,
  setPostData,
  setPostImageFile,
  setAddPostModal
) => {
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
