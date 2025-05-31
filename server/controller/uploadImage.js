import Images from "../model/Images.js";
import { v2 as cloudinary } from "cloudinary";

export async function uploadImage(data) {

  const imagePath = data.map((path) => {
    return path.path
  })

  try {
    console.log("uploaded imagees ", imagePath);
    if (!data) {
      console.error("No file uploaded.");
    }
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "gemini-api-images",
      resource_type: "image",
    });

    const imagesUrl = new Images({
      name: "Same user",
      imageUrl: result.secure_url,
      userId:"21313231",
    });

    await imagesUrl.save();

    // res.status(200).json({
    //   message: "Image uploaded successfully",
    //   data: imagesUrl,
    // });
  } catch (error) {
    console.error("Error uploading image:", error);
    // res.status(500).send("Error uploading image");
  }
}
