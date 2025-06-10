import express from "express";
import { runImageAnalyzer } from "../controller/analyzeImages.js";
import { uploads } from "../middleware/multer.js";
import { googleAuthHandler } from "../controller/auth-controller.js";

export const routes = express.Router();
 
// routes.get("/fetch", handleGetImages());

routes.post("/api/upload", uploads.array("image_persona", 6) ,runImageAnalyzer);

routes.post("/api/google", googleAuthHandler);

