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
        gemini.files
          .delete({ name: uploaded.name })
          .then(() => console.log("Deleted:", uploaded.name))
          .catch((err) => console.error("Delete failed:", err));
      }, delayInMilliseconds);

      const contentParts = createUserContent([
        ...parts,
        ` You are my good friend who always help best images for the ${occasion}? and also help me choose to best photos for posting for instagram, facebook, whatapp and other social media...
          Analyze the facial expressions, background, and mood of each image based on the analysis of the images provide me the best images or image for the ${occasion} and relation ${relatedTo}
           
          Make it visually modern, elegant, and clean. Use a responsive card layout for the selected and alternative image explanations. You can assume each image has a} or ${occasion} property.
          Your response will be displayed in a modal or component on a web page, so keep it clean and mobile-friendly.

          Please return the response in a well-formatted **HTML layout like using heading tags paragraph bold tag**, styled using **Tailwind CSS**.
          Do not include extra text or explaination of any information, just return best image and alternatives in response only in well structured html format.

          Don't add redundant infomation about tailwind css or html remove words like tailwind css, html, css, or any other technical jargons
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
        },
      });

      return response.text;
    } catch (error) {
      console.error("Error in imageAnalyzer:", error.message);
    }
  }

  async listResponse() {
    await this.gemini.files.list({
      config: { pageSize: 10 },
    });
    for await (const file of list) {
      if (file.uri) {
        return file.uri;
      }
    }

    return null;
  }
}
