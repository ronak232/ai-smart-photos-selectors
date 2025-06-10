import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { routes } from "./routes/routes.js";
import { connectDB } from "./database/db.js";

const app = express();
const server = createServer(app);
await connectDB();
const allowedOrigins = [
  "http://localhost:5173", 
  "https://ronak232.github.io/PostPal-Intelligent-Photo-Selector/",
];
app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

server.listen(process.env.SERVER_PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
