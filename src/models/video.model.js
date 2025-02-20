import mongoose from "mongoose";

// Create comment schema
const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

// Create video schema
const videoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    views: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track unique viewers
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the video
    comments: [commentSchema], // Embedded comment schema
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model("Video", videoSchema);
