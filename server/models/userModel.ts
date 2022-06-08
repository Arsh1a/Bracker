import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [40, "Name must be at most 40 characters"],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [18, "Username must be at most 18 characters"],
      unique: true,
      lowercase: true,
      match: [
        // Regex that removes spaces and special characters
        /^[a-z0-9]+$/,
        "Username must contain only letters, numbers, and underscores",
      ],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid e-mail address",
      ],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    profilePicture: {
      type: String,
      default: "default.png",
    },
  },
  { timestamps: true }
);

UserSchema.index({ username: "text" });

//Hash password and save it
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Match provided password by user with stored password
UserSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

//Sign JWT Token
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string);
};

const User = mongoose.model("User", UserSchema);

export default User;
