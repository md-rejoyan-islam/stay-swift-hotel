import {
  getHotelById,
  getHotelReviewsById,
} from "@/app/db/queries/hotel/hotel.query";
import DetailsGallery from "@/components/hotels/details/details-gallery";
import ReviewCard from "@/components/hotels/reviews/review-card";
import { Badge } from "@/components/ui/badge";
import { HOTEL_TYPE } from "@/utils/types";
import { MapPin, Star } from "lucide-react";
import Link from "next/link";

export default async function HotelDetails({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { checkIn: string; checkOut: string };
}) {
  const { id } = await params;

  const { checkIn, checkOut } = await searchParams;

  const hotel = (await getHotelById(id)) as HOTEL_TYPE;
  const reviews = await getHotelReviewsById(id);

  return (
    <div className="container max-width mx-auto px-4 py-8 ">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-3xl font-bold mb-2 dark:text-sky-100">
            {hotel?.name}
          </h1>
          <div className="flex items-center text-muted-foreground dark:text-sky-300 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hotel?.city}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-orange-400">5.3</Badge>
            <span className="dark:text-sky-100">Very Good</span>
            <span className="text-muted-foreground dark:text-sky-300">
              232 Reviews
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-3xl font-bold mb-1 dark:text-sky-100">
            $124/night
          </div>
          <p className="text-sm text-muted-foreground mb-3 dark:text-sky-300">
            Per Night for 1 Rooms
          </p>
          <Link
            href={`/hotels/${id}/payment?checkIn=${
              checkIn ? checkIn : new Date().toISOString().split("T")[0]
            }${checkOut ? `&checkOut=${checkOut}` : ""}`}
            className="w-full px-3.5 py-2.5 rounded-lg bg-orange-400 md:w-auto text-white dark:bg-violet-600 dark:text-sky-100 dark:hover:bg-violet-700"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <DetailsGallery gallery={hotel?.gallery} />

      {/* Overview Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-sky-100">Overview</h2>
        <div className="prose max-w-none dark:prose-invert dark:text-sky-200 whitespace-pre-line">
          {hotel?.overview}
        </div>
      </div>

      {/* Amenities Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4 dark:text-sky-100">Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotel?.amenities?.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center p-4 rounded-lg border dark:border-sky-800 dark:text-sky-100"
            >
              <Star className="h-5 w-5 mr-2 text-primary dark:text-violet-400" />
              {amenity}
            </div>
          ))}
        </div>
      </div>

      {/* review section */}
      <div className="mt-8">
        <div className="flex justify-between flex-wrap items-center py-4">
          <h2 className="text-2xl font-bold mb-4 dark:text-sky-100">Reviews</h2>
          <Link
            href={`/hotels/${id}/review`}
            className="dark:bg-[#ff6a28] py-2.5 px-3.5 rounded-md dark:text-white dark:hover:bg-[#ff6a28]/90 bg-[#ff6a28] text-white"
          >
            Give Review
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 ">
          {/* Review Cards */}
          {[
            {
              id: 1,
              author: "Sarah M.",
              rating: 5,
              date: "December 2024",
              content:
                "Absolutely wonderful stay! The pool view was breathtaking and the staff was incredibly attentive. The room was spotless and modern.",
              helpful: 24,
              avatar: "/placeholder.svg?height=40&width=40",
            },
            {
              id: 2,
              author: "James K.",
              rating: 4,
              date: "November 2024",
              content:
                "Great location and beautiful property. The restaurant offered excellent dining options. Only minor issue was slow WiFi in some areas.",
              helpful: 16,
              avatar: "/placeholder.svg?height=40&width=40",
            },
          ]?.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
