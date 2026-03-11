import asyncHandeler from "express-async-handler";
import { getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getNotifications = asyncHandeler(async (req, res) => {
  try {
    const { userId } = getAuth(req);
    console.log("getNotifications - userId:", userId);

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    console.log("getNotifications - user found:", user._id);

    const notifications = await Notification.find({ to: user._id })
      .sort({ createdAt: -1 })
      .populate("from", "username firstName lastName profilePicture")
      .populate("post", "content image")
      .populate("comment", "content");

    console.log("getNotifications - notifications count:", notifications.length);
    res.status(200).json({ notifications });
  } catch (error) {
    console.error("getNotifications ERROR:", error.message, error.stack);
    res.status(500).json({ error: error.message });
  }
});

export const deleteNotification = asyncHandeler(async (req, res) => {
  const { notificationId } = req.params;
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const notification = await Notification.findOneAndDelete({
    _id: notificationId,
    to: user._id,
  });

  if (!notification)
    return res.status(404).json({ error: "Notification not found" });

  res.status(200).json({ message: "Notification deleted successfully" });
});
