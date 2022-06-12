import multer from "multer";
import path from "path";
import storage from "./storage";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./server/uploads");
//   },

//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, file.fieldname + "-" + Date.now() + "." + ext);
//   },
// });

const filter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter: filter,
  limits: {
    fileSize: 1024 * 1024 * 1,
    files: 1,
  },
});

export default upload;
