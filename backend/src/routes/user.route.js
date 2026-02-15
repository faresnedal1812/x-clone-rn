import express from "express";
import {
  getUserProfile,
  updateProfile,
  syncUser,
  getCurrentUser,
  followUser,
} from "../controllers/user.controller.js";
import { protectRoute } from "./../middlewares/auth.middleware.js";

const router = express.Router();

// public route
router.get("/profile/:username", getUserProfile);

// protected route
router.get("/me", protectRoute, getCurrentUser);
router.put("/profile", protectRoute, updateProfile);
router.post("/sync", protectRoute, syncUser);
router.post("/follow/:targetUserId", protectRoute, followUser);

export default router;
