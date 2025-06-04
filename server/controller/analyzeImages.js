// import { GeminiModelInit } from "../services/gemini-api/gemini.js"; // Load from .env ideally
import { GeminiModelInit } from "../services/gemini-api/gemini.js";
import { uploadImage } from "../configs/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

export async function runImageAnalyzer(req, res) {
  const file = req.files;
  const { occasion, relation } = req.body;

  //   const { userId } = req.user;
  try {
    if (!file) {
      throw new Error("No images is provided for analysis");
    }
    // const cloudImages = await uploadImage(file);
    const model = new GeminiModelInit(
      "gemini-2.0-flash",
      process.env.Gemini_Api_Key || ""
    );

    const response = await model.imageAnalyzer(
      file,
      occasion,
      relation
      // userPrompt
    );

    if (!response) {
      return res.status(403).json({
        message:
          "Their is something wrong with Gemini, Please try again after some time",
      });
    }
    res.status(200).json({
      message: "Images analyzed successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error analyzing images:", error);
    if (error && error.stack) {
      console.error("Stack trace:", error.stack);
    }
  }
}
