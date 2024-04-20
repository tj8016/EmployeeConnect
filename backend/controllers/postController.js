import { DbPost } from "../models/post.js";
import { DbUser } from "../models/user.js";
import { ImageDeleter, ImageUploader } from "../utils/imageUploader.js";
import { ResponseErrorHandler, ResponseHandler } from "../utils/index.js";
import cloudinary from "cloudinary";

/************************************* create post ***************************************/
export const GetAllPost = async (req, res, next) => {
  try {
    let post = await DbPost.find().sort({ _id: -1 }).populate("owner");

    if (!post) return ResponseErrorHandler(res, 202, "Failed to get all post");

    return ResponseHandler(res, 200, "", post);
  } catch (error) {
    ResponseErrorHandler(res, 202, "Failed to get Post.");
    console.log("create post error ->", error);
  }
};
/************************************* create post ***************************************/
export const CreatePost = async (req, res, next) => {
  try {
    const { caption = "" } = req.body;
    const postImageFile = req.files?.postImageFile;
    const { _id } = req.user;

    let storedUrl = null;
    let post = null;
    if (postImageFile !== undefined) {
      // Upload image on db
      storedUrl = ImageUploader("/uploads/postsImage/", postImageFile);

      if (!storedUrl) {
        return ResponseErrorHandler(res, 202, "Failed to Upload Image.");
      }

      post = await DbPost.create({
        caption,
        image_url: storedUrl,
        owner: _id,
      });
    } else {
      post = await DbPost.create({
        caption,
        image_url: "",
        owner: _id,
      });
    }

    if (!post) return ResponseErrorHandler(res, 202, "Failed to create post");
    //also save it to user doc
    await DbUser.updateOne({ _id }, { $push: { posts: post } });

    return ResponseHandler(res, 200, "Post Created", post);
  } catch (error) {
    ResponseErrorHandler(res, 202, "Failed to Create Post.");
    console.log("create post error ->", error);
  }
};

/************************************* update post ***************************************/
export const UpdatePost = async (req, res, next) => {
  try {
    const { post_id, caption } = req.body;

    const post = await DbPost.findOne({ _id: post_id });
    if (!post) return ResponseHandler(res, 404, "Post not found.");
    if (caption) post.caption = caption;

    const postImageFile = req.files?.postImageFile;

    let storedUrl = null;
    if (postImageFile) {
      // Delete existing image from db
      if (post?.image_url !== "") {
        const deleteImage = ImageDeleter(post.image_url);
        if (!deleteImage)
          return ResponseErrorHandler(
            res,
            202,
            "Existing image file not Deleted."
          );
      }

      // Upload image on db
      storedUrl = ImageUploader("/uploads/postsImage/", postImageFile);

      if (!storedUrl) {
        return ResponseErrorHandler(res, 202, "Failed to Upload Image.");
      }
      post.image_url = storedUrl;
    }

    await post.save();

    ResponseHandler(res, 200, "Updated post", post);
  } catch (error) {
    console.log("update post error ->", error);
  }
};

/************************************* delete post ***************************************/
export const DeletePost = async (req, res, next) => {
  try {
    const { post_id } = req.body;

    const post = await DbPost.findOne({ _id: post_id });
    if (!post) return ResponseErrorHandler(res, 404, "Post not found.");

    // delete image file
    if (post?.image_url !== "") {
      const deleteImage = ImageDeleter(post.image_url);
      if (!deleteImage)
        return ResponseErrorHandler(
          res,
          202,
          "Existing image file not Deleted."
        );
    }

    //delte the specific entry
    await DbPost.deleteOne({ _id: post_id });

    //remove from user's exepnse array
    const user = req.user;
    const deletePost = await DbUser.updateOne(
      { _id: user._id },
      { $pull: { posts: post_id } }
    );

    if (!deletePost) return ResponseErrorHandler(res, 202, "Post not Deleted.");

    ResponseHandler(res, 200, "deleted post");
  } catch (error) {
    console.log("delete post error ->", error);
  }
};

/************************************* add/remove like in post ***************************************/
export const AddOrRemoveLikeInAPost = async (req, res, next) => {
  try {
    const { post_id } = req.body;

    const post = await DbPost.findOne({ _id: post_id });
    if (!post) return ResponseHandler(res, 404, "Post not found.");

    let message = "";
    //add or remove like from the post
    if (post?.likes?.includes(req.user._id)) {
      await DbPost.updateOne(
        { _id: post_id },
        { $pull: { likes: req.user._id } }
      );
      message = "Like removed from the post";
    } else {
      await DbPost.updateOne(
        { _id: post_id },
        { $push: { likes: req.user._id } }
      );
      message = "Liked the post";
    }

    ResponseHandler(res, 200, message);
  } catch (error) {
    console.log("like post error ->", error);
  }
};

/************************************* add comment in post ***************************************/
export const WriteCommentInAPost = async (req, res, next) => {
  try {
    const { post_id, comment = "" } = req.body;

    const post = await DbPost.findOne({ _id: post_id });
    if (!post) return ResponseHandler(res, 404, "Post not found.");

    //write comment in a post
    await DbPost.updateOne(
      { _id: post_id },
      { $push: { comments: { user: req.user._id, comment: comment } } }
    );

    ResponseHandler(res, 200, "comment added");
  } catch (error) {
    console.log("write comment post error ->", error);
  }
};

/************************************* delete comment from a post ***************************************/
export const DeleteCommentInAPost = async (req, res, next) => {
  try {
    const { post_id, comment_id } = req.body;

    const post = await DbPost.findOne({ _id: post_id });
    if (!post) return ResponseHandler(res, 404, "Post not found.");

    let index = -1,
      arr = post.comments;

    //find the comment with it's id
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]._id == comment_id) {
        index = i;
        break;
      }
    }
    let message = "comment not found !";
    //delete the comment and save the post
    if (index != -1) {
      arr.splice(index, 1);
      post.comments = arr;
      await post.save();
      message = "comment deleted";
    }

    ResponseHandler(res, 200, message);
  } catch (error) {
    console.log("write comment post error ->", error);
  }
};
