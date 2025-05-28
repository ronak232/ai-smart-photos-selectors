import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrls: { type: [String], required: true },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("UploadedImages", imagesSchema);
