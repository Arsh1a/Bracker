import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please add a user"],
    },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", ImageSchema);

export default Image;
