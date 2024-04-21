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
import { getAllUser } from "../../services/operations/authApi";

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
  const [allUsersData, setAllUsersData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");

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
    if (commentData.comment === "") return toast.error("Enter your Comment");
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

  const users = [
    {
      _id: "6620fe1cdd30644088ad71db",
      first_name: "Tohidujjaman",
      last_name: "Hoque",
      email: "tohidujjamanhoque@gmail.com",
      user_id: "1000",
    },
    {
      _id: "662132fcd846d0f8dcc2633f",
      first_name: "Tohidujjaman",
      last_name: "Hoque",
      email: "tohi7479@gmail.com",
      user_id: "1001",
    },
    {
      _id: "6621544b32411054e293fafc",
      first_name: "Apoorva",
      last_name: "something",
      email: "justmobiles24x7@gmail.com",
      user_id: "1002",
    },
    {
      _id: "6621f949f0c008cecd3c113d",
      first_name: "Mohsin",
      last_name: "Raja",
      email: "mohsin@gmail.com",
      user_id: "1003",
    },
    {
      _id: "66223dcf80bc0deb1d785ab2",
      first_name: "Hasim",
      last_name: "Molla",
      email: "mhasim790@gmail.com",
      user_id: "1004",
    },
    {
      _id: "66228c806ccc01a7e8f73467",
      first_name: "First",
      last_name: "Last Name",
      email: "temp@gmail.com",
      user_id: "1005",
    },
    {
      _id: "6624c59d7e51414e22258e1e",
      first_name: "Muqsedur",
      last_name: "Rahman",
      email: "muqsedur@gmail.com",
      user_id: "1006",
    },
  ];

  const handleInputChange = (event) => {
    const value = event.target.value;

    // console.log(allUsersData);
    setInputValue(value);
    const wordArray = value.split(" ");
    const filteredSuggestions = allUsersData.filter((user) => {
      return wordArray.every((word) => {
        return (
          user.first_name.toLowerCase().includes(word.toLowerCase()) ||
          user.last_name.toLowerCase().includes(word.toLowerCase()) ||
          user.user_id.toLowerCase().includes(word.toLowerCase()) ||
          user.email.toLowerCase().includes(word.toLowerCase())
        );
      });
    });

    setSuggestions(filteredSuggestions);
    console.log(filteredSuggestions);
    if (value === "") {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    getAllPostFunc();
    getAllUsersData();
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
    inputValue,
    setInputValue,
    suggestions,
    setSuggestions,
    handleInputChange,
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
