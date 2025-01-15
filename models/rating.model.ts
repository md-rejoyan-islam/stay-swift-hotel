import mongoose, { Schema } from "mongoose";

const ratingSchema = new Schema(
  {
    hotelId: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      required: [true, "Please enter a hotel ID"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please enter a user ID"],
    },
    rating: {
      type: Number,
      required: [true, "Please enter a rating"],
      min: [0, "Rating must be at least 0"],
      max: [5, "Rating must be at most 5"],
    },
  },
  {
    timestamps: true,
  }
);

const Rating = mongoose.models.Rating ?? mongoose.model("Rating", ratingSchema);

export default Rating;
