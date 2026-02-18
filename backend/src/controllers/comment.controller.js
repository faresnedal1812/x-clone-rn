import asyncHandler from "express-async-handler";
import Comment from "../models/comment.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";
import { getAuth } from "@clerk/express";

export const getPostComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId })
    .sort({ createdAt: -1 })
    .populate("user", "username firstName lastName profilePicture");

  res.status(200).json({ comments });
});

export const createPostComment = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const { content } = req.body;

  if (!content || content.trim() === "")
    return res.status(400).json({ error: "Comment content is required" });

  const user = await User.findOne({ clerkId: userId });
  const post = await Post.findById(postId);

  if (!user || !post)
    return res.status(404).json({ error: "User or post not found" });

  const newComment = await Comment.create({
    user: user._id,
    post: postId,
    content,
  });

  // link the comment to the post
  await Post.findByIdAndUpdate(postId, {
    $push: { comments: newComment._id },
  });

  if (post.user.toString() !== user._id.toString()) {
    await Notification.create({
      from: user._id,
      to: post.user,
      type: "comment",
      post: post._id,
      comment: newComment._id,
    });
  }

  res.status(201).json({ comment: newComment });
});

export const deletePostComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerkId: userId });
  const comment = await Comment.findById(commentId);
  const post = await Post.findById(comment.post);

  if (!user || !comment || !post)
    return res.status(404).json({ error: "User or Post or Comment not found" });

  if (
    comment.user.toString() !== user._id.toString() &&
    post.user.toString() !== user._id.toString()
  )
    return res.status(403).json({
      error:
        " You can only delete this comment if you are the author of the comment or the author of the post.",
    });

  await Comment.findByIdAndDelete(commentId);
  // remove the comment from the post
  await Post.findByIdAndUpdate(comment.post, {
    $pull: { comments: commentId },
  });
  // remove related notifications
  await Notification.deleteMany({ comment: commentId });

  res.status(200).json({ message: "Comment deleted successfully" });
});
