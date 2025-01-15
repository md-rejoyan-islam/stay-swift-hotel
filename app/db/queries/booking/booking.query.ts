import Booking from "@/models/booking.model";
import { BOOKING_TYPE, HOTEL_TYPE } from "@/utils/types";
import mongoose from "mongoose";

export const getBookingByUserId = async (userId: string) => {
  const booking = await Booking.find<Promise<BOOKING_TYPE>>({
    userId: userId,
  })
    .populate("hotelId")
    .lean();

  if (!booking) return [];

  return booking?.map((booking) => {
    const hotel = booking.hotelId as HOTEL_TYPE;

    delete booking.hotelId;
    delete booking.userId;
    return {
      ...booking,
      _id: (booking._id as mongoose.Types.ObjectId).toString(),
      hotel: {
        name: hotel.name,
        city: hotel.city,
        price: hotel.price,
      },
    };
  });
};
