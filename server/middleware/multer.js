import multer from "multer";

// Use memory storage instead of disk
const storage = multer.memoryStorage();

const uploads = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 10 }
});

export { uploads };
