import Booking from "@/models/booking.model";
import Hotel from "@/models/hotel.model";

export const getBookingByUserId = async (userId: string) => {
  const booking = await Booking.find({
    userId: userId,
  })
    .populate({
      path: "hotelId",
      model: Hotel,
    })
    .lean();

  if (!booking) return [];

  return booking?.map((booking) => {
    return {
      ...booking,
      _id: booking._id.toString(),
      hotelId: undefined,
      hotel: {
        _id: booking.hotelId._id.toString(),
        name: booking.hotelId.name,
        city: booking.hotelId.city,
        thumnailUrl: booking.hotelId.thumnailUrl,
        propertyCategory: booking.hotelId.propertyCategory,
        lowestRate: booking.hotelId.lowestRate,
        highestRate: booking.hotelId.highestRate,
      },
    };
  });
};
