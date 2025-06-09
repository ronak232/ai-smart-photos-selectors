import Images from "../model/Images.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(data, occasion) {
  const uploads = [];
  try {
    if (!data) {
      console.error("No file uploaded.");
    }

    for (let i = 0; i < data.length; i++) {
      const file = data[i];
      const base64 = file.buffer.toString("base64");
      const dataUri = `data:${file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUri, {
        folder: "gemini-api-images",
        resource_type: "image",
        format: ["webp", "jpeg", "png"],
        allowed_formats: ["webp", "heic", "jpg", "png", "webm"],
        transformation: [
          {
            crop: "scale",
            fetch_format: "auto",
            quality: "auto",
            responsive: true,
          },
        ]
      });

      const imagesUrl = new Images({
        name: "Same user",
        imageUrl: result.secure_url,
        userId: "21313231",
      });

      await imagesUrl.save();

      uploads.push({
        url: result.secure_url,
        originalFilename: result.original_filename,
        mimeType:
          result.resource_type === "image"
            ? "image/jpeg"
            : "application/octet-stream",
        label: `${occasion} - Best-Image-${i + 1}`,
      });
    }

    return uploads;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}
