import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
cloudinary.config({
  cloud_name: "depn4i2de",
  api_key: "372971395515416",
  api_secret: "m29YBSN_9FiyBdaeMdZ1m2iakuA",
  secure: process.env.NODE_ENV === "production",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: <any>{
    folder: "ProfilePictures",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

export default storage;
