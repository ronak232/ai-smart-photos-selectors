import express from "express";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { routes } from "./routes/routes.js";

const app = express();
const server = createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes)


server.listen(5000, () => {
  console.log("Server is running on port 3000");
});