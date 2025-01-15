import Booking from "@/models/booking.model";
import connectDB from "@/services/mongo";
import { isHotelBooked } from "@/utils/data-utils";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { hotelId, checkIn, checkOut, userId } = await request.json();
  try {
    await connectDB();
    const booking = await Booking.findOne({
      hotelId,
    }).lean();

    if (!booking)
      new NextResponse("Hotel not found", {
        status: 404,
      });

    const isBooked = await isHotelBooked(checkIn, checkOut, booking);

    if (isBooked)
      new NextResponse("Hotel already booked", {
        status: 409,
      });

    await Booking.create({
      hotelId: hotelId,
      checkIn: checkIn,
      checkOut: checkOut,
      userId: userId,
    });

    return new NextResponse("Hotel booked successfully", {
      status: 201,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
};
