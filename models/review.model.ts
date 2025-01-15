import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "Please enter a hotel ID"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter a user ID"],
    },
    content: {
      type: String,
      required: [true, "Please enter a comment"],
      trim: true,
      minlength: [3, "Comment must be at least 3 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Please enter a rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.models.Review ?? mongoose.model("Review", reviewSchema);

export default Review;
