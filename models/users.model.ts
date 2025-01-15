import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a user name"],
      trim: true,
      minlength: [3, "User name must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      trim: true,
      minlength: [3, "Email must be at least 3 characters"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    Image: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User ?? mongoose.model("User", userSchema);

export default User;
