import mongoose from "mongoose";

const imagesSchema = new mongoose.Schema(
  {
    imageUrls: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("UploadedImages", imagesSchema);
