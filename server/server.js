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

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

server.listen(process.env.SERVER_PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
