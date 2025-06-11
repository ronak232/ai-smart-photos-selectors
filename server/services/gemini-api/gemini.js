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
          userOptions += `When you'll get user prompt understand and extract important occasion and event from ${userPrompt}? and also help to choose the best photos for posting on instagram, facebook, whatsapp, other social media or any occasion...
          Analyze the facial expressions, background, and mood from images and based on the analysis, provide best images or image to the user.
          You need to analyse each image deeply based on what user asked - ${userPrompt}.
          - Add short visual preview of those image/images you analysed for best (use <img src="..."> tags with fixed height and center of div)
       `;
        } else {
          userOptions += ` When you'll get ${occasion}? and ${relatedTo} value, help user to choose best photos for posting for instagram, facebook, whatsapp, other social media or any occasion..
          Analyze the facial expressions, background, mood, occasion, event of each image then provide options from images to user.
          You can assume each image has ${relatedTo} or ${occasion} property.
          - Add short visual preview of those image/images you analysed for best (use <img src="..."> tags with fixed height and center of div)
       `;
        }
        return userOptions;
      }
      let userChoice = userOption();

      const contentParts = createUserContent([...parts, userChoice]);

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
          systemInstruction: `You are like my good friend Please return the response in a well-formatted HTML responsive grid layout on each devices, use heading paragraph bold list tag**, styled using **Tailwind CSS** and add custom class name for styling like best-img with name on each img tag. 
          And in end write the about best image in a bold tag.
          Make it visually modern, elegant, and clean. Use a responsive card layout.
          Make sure to use the **Tailwind CSS** classes for styling, and ensure the layout is responsive and visually appealing.
          Remove Doctype, head, meta, title or body tags and other unnecessary tags just wrap in div tag
          Remove redundant technical jargons like tailwind, html,css
          return in html format
          Rules for the response:
          - label for each image like (if multiple good images then name it like(Best-Image-Name) or if only single image name it (Best-image)) 
          - keep in mind you have to smartly provide best images not every provided images.
          For example - If user provide two images return only best one... 
          Similarly If user provide multiple images ${
            imagesList.length >= 3
          } then compare the images return two best images. and so on.
          - Do not show preview of the uploaded images...

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
