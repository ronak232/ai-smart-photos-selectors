import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
  HarmCategory,
} from "@google/genai";
import path from "node:path";

export class GeminiModelInit {
  constructor(model, apikey) {
    this.model = model;
    this.apikey = apikey;
    this.gemini = new GoogleGenAI({
      apiKey: this.apikey,
    });
  }
  async imageAnalyzer(imagesList, occasion, relatedTo) {
    try {
      const parts = [];
      const delayInMilliseconds = 4 * 60 * 60 * 1000; // Convert hours to milliseconds
      for (const input of imagesList) {
        const { path: imagePath, mimetype } = input;
        const ext = path.extname(imagePath).toLowerCase();

        if (
          ext === ".jpg" ||
          ext === ".jpeg" ||
          ext === ".webp" ||
          ext === ".png"
        ) {
          let uploaded = await this.gemini.files.upload({
            file: imagePath,
            config: { mimeType: mimetype },
          });

          parts.push(createPartFromUri(uploaded.uri, uploaded.mimeType));
          console.log("Uploaded:", uploaded.uri);
        }
      }
      setTimeout(() => {
        this.gemini.files
          .delete({ name: uploaded.name })
          .then(() => console.log("Deleted:", uploaded.name))
          .catch((err) => console.error("Delete failed:", err));
      }, delayInMilliseconds);

      const contentParts = createUserContent([
        ...parts,
        ` You are my good friend who always help best images for the ${occasion}? and also help me choose to best photos for posting for instagram, facebook, whatapp and other social media...
          Analyze the facial expressions, background, and mood of each image based on the analysis of the images provide me the best images or image for the ${occasion} and relation ${relatedTo}.
          You can assume each image has ${relatedTo} or ${occasion} property.
       `,
      ]);

      const response = await this.gemini.models.generateContent({
        model: this.model,
        contents: contentParts,
        config: {
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: "2",
            },
          ],
          systemInstruction: `Please return the response in a well-formatted HTML layout like using heading paragraph bold list tag**, styled using **Tailwind CSS** and add class name for styling like best-img or alternative-img. And in end write the about best image in a bold tag and also write the alternative images in a list tag.
          Make it visually modern, elegant, and clean. Use a responsive card layout.
          If user provide multiple more than 3 images then only compare the images and provide alternative images 
          Make sure to use the **Tailwind CSS** classes for styling, and ensure the layout is responsive and visually appealing.
          Remove Doctype, head, meta, title or body tags and other unnecessary tags just wrap in div tag
          Don't add redundant infomation about about prompt and remove words like tailwind css, html, css, or any other technical jargons Example. only clean and HTML layout using Tailwind CSS to help me to choose the best image to share, focusing on visual appeal and a friendly tone.
          return in html format
          `,
        },
      });
      console.log("response ", response.text);
      return response.text;
    } catch (error) {
      console.error("Error in imageAnalyzer:", error.message);
    }
  }
}
