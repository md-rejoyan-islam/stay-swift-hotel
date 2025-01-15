import { getHotelReviewsById } from "@/app/db/queries/hotel/hotel.query";
import { ratingToCondition } from "@/utils/data-utils";
import { HOTEL_TYPE } from "@/utils/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoLocation } from "react-icons/io5";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export default async function HotelCard({
  hotel,
  checkIn,
  checkOut,
}: {
  hotel: HOTEL_TYPE;
  checkIn?: string;
  checkOut?: string;
}) {
  const reviews = await getHotelReviewsById(hotel._id);

  const avarageRating =
    reviews.reduce(
      (acc: number, review: { _id: string; __v: number; rating?: number }) => {
        return acc + (review?.rating || 0);
      },
      0
    ) / (reviews.length || 1);

  return (
    <Card
      key={hotel?._id}
      className="overflow-hidden dark:bg-sky-900 dark:border-sky-800"
    >
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-4 relative">
          <Image
            src={hotel?.thumbnailUrl}
            alt={hotel?.name}
            width={400}
            height={300}
            className="object-cover h-full w-full max-h-[300px]"
          />
        </div>
        <CardContent className="md:col-span-8 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-semibold mb-2 dark:text-sky-100">
                {hotel?.name}
              </h3>
              <p className="text-muted-foreground mb-4 dark:text-sky-300 flex gap-1 items-center">
                <IoLocation className="text-red-500 text-xl" /> {hotel?.city}
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <Badge variant="secondary" className="bg-[#ff6a28] text-white">
                  {avarageRating}
                </Badge>
                <span className="dark:text-sky-100">
                  {ratingToCondition(Math.floor(avarageRating))}
                </span>
                <Link
                  href={`/hotels/${hotel?._id}/review`}
                  className="text-muted-foreground dark:text-sky-300"
                >
                  {reviews?.length > 0
                    ? `${reviews?.length} Reviews`
                    : "Give First Review"}
                </Link>
              </div>
              <div className="flex gap-2">
                <p className="text-white bg-orange-400 px-2 py-1 rounded-md inline-block text-xs">
                  {hotel?.propertyCategory} star property
                </p>
                <p
                  className={clsx(
                    hotel?.isBooked ? "bg-red-500" : "bg-green-500",
                    "text-white  px-2 py-1 rounded-md inline-block text-xs"
                  )}
                >
                  {hotel?.isBooked ? "Booked" : "Available"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold dark:text-sky-100">
                ${hotel?.price}/night
              </div>
              <p className="text-sm text-muted-foreground mb-4 dark:text-sky-300">
                Per Night for 1 Rooms
              </p>
              <Link
                href={`/hotels/${hotel._id}?checkIn=${checkIn}${
                  checkOut ? `&checkOut=${checkOut}` : ""
                }`}
                className="dark:bg-[#ff6a28] py-2.5 px-3.5 rounded-md dark:text-white dark:hover:bg-[#ff6a28]/90 bg-[#ff6a28] text-white"
              >
                Details
              </Link>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
