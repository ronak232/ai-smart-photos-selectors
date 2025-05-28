import Images from "../model/Images.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (req, res) => {
  try {
    const file = req.files;
    const { name } = req.body;
    const { userId } = req.user;

    console.log("uploaded imagees ", file);
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "gemini-api-images",
      resource_type: "image",
    });

    const imagesUrl = new Images({
      name,
      imageUrl: result.secure_url,
      userId,
    });

    await imagesUrl.save();

    res.status(200).json({
      message: "Image uploaded successfully",
      data: imagesUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Error uploading image");
  }
};
