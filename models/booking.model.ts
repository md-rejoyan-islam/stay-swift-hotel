import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
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
    checkIn: {
      type: Date,
      required: [true, "Please enter a check-in date"],
    },
    checkOut: {
      type: Date,
      required: [true, "Please enter a check-out date"],
    },
  },
  {
    timestamps: true,
  }
);

const Booking =
  mongoose.models.Booking ?? mongoose.model("Booking", bookingSchema);

export default Booking;
