import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Body from "./Body";
import Navbar from "../../components/common/Navbar";
import {
  createPost,
  deletePost,
  getAllPost,
  updatePost,
  addOrRemoveLike,
  addComment,
} from "../../services/operations/postApi";

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [allPostData, setAllPostData] = useState([]);
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [commentData, setCommentData] = useState({
    post_id: "",
    comment: "",
  });
  const [addPostModal, setAddPostModal] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [deletePostModal, setDeletePostModal] = useState(false);
  const [deletePostData, setDeletePostData] = useState(null);
  const [postData, setPostData] = useState({
    caption: "",
  });
  const [postImageFile, setPostImageFile] = useState(null);

  const [editPostData, setEditPostData] = useState({
    _id: "",
    caption: "",
  });
  const [editPostImageFile, setEditPostImageFile] = useState(null);

  const uploadImageFile = (e) => {
    if (e.target.files.length > 0) {
      setPostImageFile({
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      });
    }
  };

  const createPostSubmit = async () => {
    if (postData?.caption === "" && postImageFile === null)
      return toast.error("Add something to post");
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

  const updatePostSubmit = async () => {
    const formData = new FormData();
    formData.append("post_id", editPostData._id);
    formData.append("caption", editPostData.caption);
    if (editPostImageFile?.data) {
      formData.append("postImageFile", editPostImageFile.data);
    }

    const result = await updatePost(formData, token);
    if (result !== null) {
      setEditPostData({
        caption: "",
      });
      setEditPostImageFile(null);
      setEditPostModal(false);
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

  const addOrRemoveLikeFunc = async (post_id) => {
    const data = {
      post_id: post_id,
    };
    const res = await addOrRemoveLike(data, token);
    getAllPostFunc();
  };

  const addCommentSubmit = async () => {
    const data = {
      post_id: addCommentModal,
      comment: commentData.comment,
    };
    const res = await addComment(data, token);
    getAllPostFunc();
    if (res !== null) {
      setCommentData({
        post_id: "",
        comment: "",
      });
      setAddCommentModal(false);
    }
  };

  useEffect(() => {
    getAllPostFunc();
  }, []);

  const _this = {
    allPostData,
    setAllPostData,
    addPostModal,
    setAddPostModal,
    editPostModal,
    setEditPostModal,
    editPostData,
    setEditPostData,
    editPostImageFile,
    setEditPostImageFile,
    deletePostModal,
    setDeletePostModal,
    deletePostData,
    setDeletePostData,
    postData,
    setPostData,
    postImageFile,
    addCommentModal,
    setAddCommentModal,
    commentData,
    setCommentData,
    addCommentSubmit,
    setPostImageFile,
    uploadImageFile,
    createPostSubmit,
    updatePostSubmit,
    deletePostSubmit,
    addOrRemoveLikeFunc,
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
