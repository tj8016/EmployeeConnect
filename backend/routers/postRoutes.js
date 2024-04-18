import { Router } from "express";
import { isAuthenticated } from "../middleware/authentication.js";
import {
  AddOrRemoveLikeInAPost,
  CreatePost,
  DeleteCommentInAPost,
  DeletePost,
  UpdatePost,
  WriteCommentInAPost,
} from "../controllers/postController.js";
const router = Router();

router.post("/create-post", isAuthenticated, CreatePost);
router.post("/update-post", isAuthenticated, UpdatePost);
router.delete("/delete-post", isAuthenticated, DeletePost);
router.put("/like-or-unlike-a-post", isAuthenticated, AddOrRemoveLikeInAPost);
router.post("/comment-in-a-post", isAuthenticated, WriteCommentInAPost);
router.delete(
  "/delete-comment-of-a-post",
  isAuthenticated,
  DeleteCommentInAPost
);

export default router;
