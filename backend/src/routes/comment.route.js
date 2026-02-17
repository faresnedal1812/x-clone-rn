import express from "express";
import { protectRoute } from "./../middlewares/auth.middleware.js";
import {
  getPostComments,
  createPostComment,
  deletePostComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// public routes
router.get("/post/:postId", getPostComments);

// private routes
router.post("/post/:postId", protectRoute, createPostComment);
router.delete("/:commentId", protectRoute, deletePostComment);

export default router;
