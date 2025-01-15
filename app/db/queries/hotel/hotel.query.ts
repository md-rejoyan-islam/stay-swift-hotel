import Booking from "@/models/booking.model";
import Hotel from "@/models/hotel.model";
import Rating from "@/models/rating.model";
import Review from "@/models/review.model";
import { isHotelBooked } from "@/utils/data-utils";
import {
  HOTEL_FILTER_QUERY,
  HOTEL_PARAMS_QUERY,
  HOTEL_TYPE,
  REVIEW_TYPE,
} from "@/utils/types";
import mongoose from "mongoose";

export async function getAllHotels({
  destination,
  checkIn,
  checkOut,
  category,
  sort,
  minPrice,
  maxPrice,
}: HOTEL_PARAMS_QUERY) {
  const hotelQuery: HOTEL_FILTER_QUERY = {};
  if (destination) {
    hotelQuery.city = new RegExp(destination, "i"); // Case-insensitive match
  }
  if (category) {
    const categories = category.split("|");
    hotelQuery.propertyCategory = { $in: categories };
  }

  if (minPrice && maxPrice) {
    hotelQuery.price = {
      $gte: Number(minPrice),
      $lte: Number(maxPrice),
    };
  }

  const hotels = await Hotel.find<HOTEL_TYPE[]>(hotelQuery)
    .select(["name", "city", "thumbnailUrl", "propertyCategory", "price"])
    .sort({ price: sort === "asc" ? 1 : -1 })
    .lean();

  // booking query
  await Promise.all(
    hotels.map(async (hotel) => {
      const booking = await Booking.findOne({
        hotelId: hotel._id,
      }).lean();
      hotel.isBooked = await isHotelBooked(checkIn, checkOut, booking);
    })
  );

  return hotels?.map((hotel) => {
    return {
      ...hotel,
      _id: (hotel._id as mongoose.Types.ObjectId).toString(),
    };
  });
}

export async function getHotelRatingById(id: string) {
  const ratings = await Rating.find<REVIEW_TYPE>({
    hotelId: new mongoose.Types.ObjectId(id),
  }).lean();

  return ratings?.map((rating) => {
    return {
      ...rating,
      _id: (rating._id as mongoose.Types.ObjectId).toString(),
    };
  });
}
export async function getHotelReviewsById(id: string) {
  const reviews = await Review.find<REVIEW_TYPE>({
    hotel: id,
  }).lean();

  return reviews?.map((review) => {
    return {
      ...review,
      _id: (review._id as mongoose.Types.ObjectId).toString(),
    };
  });
}

export async function getHotelById(id: string) {
  const hotel = await Hotel.findById<HOTEL_TYPE>(id).lean();

  if (!hotel) {
    throw new Error("Hotel not found");
  }

  return {
    ...hotel,
    _id: (hotel._id as mongoose.Types.ObjectId).toString(),
  };
}
