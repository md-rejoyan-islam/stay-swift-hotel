import { getAllHotels } from "@/app/db/queries/hotel/hotel.query";
import { HOTEL_TYPE } from "@/utils/types";
import HotelCard from "./hotel-card";
import SortByPrice from "./sort/sort-by-price";
import SortByRange from "./sort/sort-by-range";
import SortByStar from "./sort/sort-by-star";

const refineCategory = (category: string = "") => {
  const decodedCategory = decodeURI(category);
  if (decodedCategory === "undefined") return "";
  return decodedCategory;
};

export async function SearchResults({
  searchParams: {
    destination,
    checkIn,
    checkOut,
    category,
    sort,
    minPrice,
    maxPrice,
  } = {},
}: {
  searchParams?: {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    category?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
  };
}) {
  const hotels = await getAllHotels({
    destination: destination === "all" ? "" : destination,
    checkIn,
    checkOut,
    category: refineCategory(category),
    sort,
    minPrice,
    maxPrice,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-width ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className=" space-y-6 sm:space-y-0 gap-8 justify-between flex-wrap sm:flex lg:block lg:space-y-6">
          <SortByPrice />

          <SortByRange />

          <SortByStar />

          {/* <SortByAmenities /> */}
        </div>

        {/* Results */}
        <div className="lg:col-span-3 space-y-6">
          {hotels?.map((hotel) => (
            <HotelCard
              key={1}
              hotel={hotel as HOTEL_TYPE}
              checkIn={checkIn}
              checkOut={checkOut}
            />
          ))}
          {/* if no hotels found */}
          {hotels?.length === 0 && (
            <div className="text-center text-lg text-red-500">
              No hotels found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
