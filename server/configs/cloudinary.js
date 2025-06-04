import Images from "../model/Images.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(data) {
  const imagePath = data.map((path) => {
    return path.path;
  });
  const uploads = [];
  try {
    if (!data) {
      console.error("No file uploaded.");
    }
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "gemini-api-images",
      resource_type: "image",
      format: ["webp", "jpeg", "png"],
      allowed_formats: ["webp", "heic", "jpg", "png", ""],
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
    });
    return uploads;
  } catch (error) {
    console.error("Error uploading image:", error);
    // res.status(500).send("Error uploading image");
  }
}
