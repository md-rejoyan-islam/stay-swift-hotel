import { getHotelById } from "@/app/db/queries/hotel/hotel.query";
import { getUserByEmail } from "@/app/db/queries/user/user.query";
import { PaymentForm } from "@/components/payment/payment-form";
import { PaymentSummary } from "@/components/payment/payment-summary";

import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { SessionType, UserType } from "@/lib/types";
import { HOTEL_TYPE } from "@/utils/types";
import { redirect } from "next/navigation";

export default async function PaymentPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ checkIn: string; checkOut: string }>;
  params: Promise<{ id: string }>;
}) {
  const session = (await auth()) as unknown as SessionType;

  const { id } = await params;

  const user = (await getUserByEmail(
    session?.user?.email
  )) as unknown as UserType;
  const { checkIn, checkOut } = await searchParams;

  if (!session) {
    return redirect("/login");
  }

  const hotel = (await getHotelById(id)) as HOTEL_TYPE;

  const bookingDetails = {
    hotelName: hotel?.name,
    location: hotel?.city,
    checkIn: checkIn,
    checkOut: checkOut || new Date().toISOString(),
    rooms: 1,
    guests: 1,
    pricePerNight: hotel?.price,
    numberOfNights: 1,
    taxes: 49.6,
    serviceFee: 24.8,
  };

  return (
    <div className="container mx-auto px-4 py-8 max-width">
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 dark:bg-sky-900/50 dark:border-sky-800">
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6 dark:text-sky-100">
              Complete your booking
            </h1>
            <PaymentForm
              searchParams={await searchParams}
              email={session?.user?.email}
              name={session?.user?.name}
              hotelId={id}
              userId={user?._id}
            />
          </div>
        </Card>
        <div className="lg:pl-4">
          <PaymentSummary booking={bookingDetails} />
        </div>
      </div>
    </div>
  );
}
