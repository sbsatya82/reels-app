import mongoose from "mongoose";

// Create user schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" }, // You can set a default profile image URL if needed
    likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },
  { timestamps: true }
);

// Prevent re-compilation in Next.js
export default mongoose.models.User || mongoose.model("User", userSchema);
