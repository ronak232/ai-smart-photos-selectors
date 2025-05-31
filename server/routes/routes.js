import express from "express";
import { runImageAnalyzer } from "../controller/analyzeImages.js";
import { uploads } from "../middleware/multer.js";

export const routes = express.Router();

// routes.get("/fetch", handleGetImages());

routes.post("/api/upload", uploads.array("image_personas", 4) ,runImageAnalyzer);