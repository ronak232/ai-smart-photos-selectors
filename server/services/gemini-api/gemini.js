import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import * as fs from "node:fs";

export class GeminiModelInit {
  constructor(model) {
    this.model = model;
  }
  static apiKey = process.env.GEMINI_API_KEY;
  static async image() {
    const model = new GoogleGenAI({
      apiKey,
    });
    const generativeImageUnderstanding = await model.files.upload({
        file: fs
    })
    return model;
  }
}
