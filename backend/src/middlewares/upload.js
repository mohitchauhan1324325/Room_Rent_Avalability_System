import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "rooms",
    resource_type: "auto",
    allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov"],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024, files: 10 },
  fileFilter: (_req, file, callback) => {
    const allowed = new Set(["image/jpeg", "image/png", "video/mp4", "video/quicktime"]);
    callback(allowed.has(file.mimetype) ? null : new Error("Only JPG, PNG, MP4, and MOV uploads are allowed"), allowed.has(file.mimetype));
  },
});

export default upload;
