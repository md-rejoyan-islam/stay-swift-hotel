import {
  getHotelById,
  getHotelReviewsById,
} from "@/app/db/queries/hotel/hotel.query";
import { getUserByEmail } from "@/app/db/queries/user/user.query";
import ReviewCard from "@/components/hotels/reviews/review-card";
import TakeReview from "@/components/hotels/reviews/take-review";
import { auth } from "@/lib/auth";
import { SessionType, UserType } from "@/lib/types";
import { HOTEL_TYPE } from "@/utils/types";
import { Star } from "lucide-react";
import Image from "next/image";

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  avatar: string;
  createdAt: string;
}

export default async function ReviewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const reviews = (await getHotelReviewsById(id)) as unknown as Review[];

  const hotel = (await getHotelById(id)) as HOTEL_TYPE;
  const session = (await auth()) as unknown as SessionType;

  const avarageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length ||
    0;

  const user = (await getUserByEmail(
    session?.user?.email
  )) as unknown as UserType;

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Guest Reviews for {hotel?.name}
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center mr-4">
                <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                <span className="ml-1 font-semibold">
                  {avarageRating.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground">
                {reviews?.length} Reviews
              </span>
            </div>
          </div>

          <TakeReview userId={user?._id} hotelId={hotel?._id} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="col-span-full md:col-span-2 lg:col-span-2">
            <Image
              src={hotel?.thumbnailUrl}
              alt="Hotel Room"
              width={800}
              height={600}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
          <div className="hidden lg:block">
            <div className="grid gap-4">
              {hotel?.gallery?.slice(0, 2).map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt="Hotel Pool View"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-[190px]"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 grid-cols-1">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}

          {/* if no reviews found  */}
          {reviews.length === 0 && (
            <div className="col-span-full">
              <div className="flex items-center justify-center p-10">
                <p className="text-red-400">No reviews found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
