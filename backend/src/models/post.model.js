import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      maxLength: 350,
    },
    image: {
      type: String,
      default: "",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

postSchema.pre("validate", function () {
  if (!this.content.trim() && !this.image) {
    this.invalidate("content", "Post must have either text or image");
  }
});

const Post = mongoose.model("Post", postSchema);

export default Post;
