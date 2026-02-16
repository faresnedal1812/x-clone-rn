// multer is a middleware for handling multipart/form-data, which is primarily used for file uploads
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // uploading should pass if file type is image/png, image/jpeg or ...
  if (file.memetype.startsWith("image/")) {
    cb(null, true); // there is no error and uploading must pass
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;
