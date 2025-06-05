import { GoogleGenAI, createUserContent, HarmCategory } from "@google/genai";
import fetch from "node-fetch";
export class GeminiModelInit {
  constructor(model, apikey) {
    this.model = model;
    this.apikey = apikey;
    this.gemini = new GoogleGenAI({
      apiKey: this.apikey,
    });
  }
  async imageAnalyzer(imagesList, occasion, relatedTo, userPrompt) {
    try {
      const parts = [];

      for (let i = 0; i < imagesList.length; i++) {
        const { url, label, mimeType } = imagesList[i];

        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString("base64");

        parts.push({
          inlineData: {
            mimeType,
            data: base64,
          },
        });

        parts.push({
          text: `Label: ${label}, view here: ${url}`,
        });
      }

      function userOption() {
        let userOptions = "";

        if (userPrompt && userPrompt.length > 0) {
          userOptions += ` You are my good friend who always help best images extact the occasion and event from ${userPrompt}? and also help me choose to best photos for posting for instagram, facebook, whatapp and other social media...
          Analyze the facial expressions, background, and mood of each image based on the analysis of the images provide by user best images or image for the occasion and relatio.
          You can deep analyse each image based on ${userPrompt}.
          - A short visual preview for each image (use <img src="..."> tags with fixed height and center of div)
       `;
        } else {
          userOptions += ` You are my good friend who always help best images for the ${occasion}? and also  help me choose to best photos for posting for instagram, facebook, whatapp and other social media...
          Analyze the facial expressions, background, and mood of each image based on the analysis of the images provide by user best images or image for the ${occasion} and relation ${relatedTo}.
          You can assume each image has ${relatedTo} or ${occasion} property.
          - A short visual preview for each image (use <img src="..."> tags with fixed height)
       `;
        }
        return userOptions;
      }
      let userChoice = userOption();

      const contentParts = createUserContent([
        ...parts,
        userChoice,
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
          systemInstruction: `Please return the response in a well-formatted HTML layout like using heading paragraph bold list tag**, styled using **Tailwind CSS** and add custom class name for styling like best-img on each img tag. 
          And in end write the about best image in a bold tag.
          Make it visually modern, elegant, and clean. Use a responsive card layout.
          Make sure to use the **Tailwind CSS** classes for styling, and ensure the layout is responsive and visually appealing.
          Remove Doctype, head, meta, title or body tags and other unnecessary tags just wrap in div tag
          Remove redundant technical jargons like tailwind, html,css
          return in html format
          - label for each image like (Best Images or Best Image)
          - keep in my you have to smartly provide best images not every provided images.
          For example If user provide two images return best one of them 
          If user provide multiple images ${
            imagesList.length >= 3
          } then compare the images return two best images.
          `,
        },
      });
      return response.text
        .replace(/^```html\s*```/i, "")
        .replace(/```$/i, "")
        .trim();
    } catch (error) {
      console.error("Error in imageAnalyzer:", error.message);
    }
  }
}
