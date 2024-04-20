import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Body from "./Body";
import Navbar from "../../components/common/Navbar";
import {
  createPost,
  deletePost,
  getAllPost,
} from "../../services/operations/postApi";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [allPostData, setAllPostData] = useState([]);
  const [addPostModal, setAddPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [deletePostData, setDeletePostData] = useState(null);
  const [postData, setPostData] = useState({
    caption: "",
  });
  const [postImageFile, setPostImageFile] = useState(null);

  const uploadImageFile = (e) => {
    if (e.target.files.length > 0) {
      setPostImageFile({
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      });
    }
  };

  const createPostSubmit = async () => {
    const formData = new FormData();
    formData.append("caption", postData.caption);
    if (postImageFile !== null) {
      formData.append("postImageFile", postImageFile.data);
    }

    const result = await createPost(formData, token);
    if (result !== null) {
      setPostData({
        caption: "",
      });
      setPostImageFile(null);
      setAddPostModal(false);
      getAllPostFunc();
    }
  };

  const getAllPostFunc = async () => {
    setLoading(true);
    try {
      const res = await getAllPost();
      setAllPostData(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deletePostSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        post_id: deletePostData?._id,
      };
      const result = await deletePost(data, token);
      if (result !== null) {
        setDeletePostData(false);
        setDeletePostModal(false);
        getAllPostFunc();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllPostFunc();
  }, []);

  const _this = {
    allPostData,
    setAllPostData,
    addPostModal,
    setAddPostModal,
    deletePostModal,
    setDeletePostModal,
    deletePostData,
    setDeletePostData,
    postData,
    setPostData,
    postImageFile,
    setPostImageFile,
    uploadImageFile,
    createPostSubmit,
    deletePostSubmit,
  };
  return (
    <>
      <Navbar />
      <div className={`mt-[5px] pt-[30px] bg-black/5`}>
        <Body {..._this} />
      </div>
    </>
  );
};

export default Home;
