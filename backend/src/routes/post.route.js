import express from "express";
import { protectRoute } from "./../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  likePost,
} from "../controllers/post.controller.js";
import upload from "./../middlewares/upload.middleware.js";

const router = express.Router();

// public routes
router.get("/", getPosts);
router.get("/:postId", getPost);
router.get("/post/:username", getUserPosts);

// protected routes

/*
   - "image" => is the name field in form element in frontend
   - the result of this middleware:
     1. if data type in payload is image => you can access it by req.file
     2. the rest of data => you can access it by req.body
*/
router.post("/", protectRoute, upload.single("image"), createPost);
router.post("/:postId/like", protectRoute, likePost);
router.delete("/:postId", protectRoute, deletePost);

export default router;
