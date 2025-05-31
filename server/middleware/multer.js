import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import fs from "node:fs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadFolder = path.join(__dirname, "../uploads", );

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
let uploads = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 8 },
});

export { uploads };
