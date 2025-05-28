import express from "express";
import { uploadImage } from "../controller/uploadImage.js";

export const routes = express.Router();

// routes.get("/fetch", handleGetImages());

routes.post("/upload", uploadImage);