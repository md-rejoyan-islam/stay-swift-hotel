import { getBookingByUserId } from "@/app/db/queries/booking/booking.query";
import { getUserByEmail } from "@/app/db/queries/user/user.query";
import { BookingList } from "@/components/booking/booking-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";
import { SessionType, UserType } from "@/lib/types";
import { dayDifference } from "@/utils/data-utils";
import { redirect } from "next/navigation";

interface Booking {
  id: string;
  _id: string;
  hotel: {
    name: string;
    city: string;
    price: number;
  };
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
  numberOfNights: number;
  hotelName: string;
}

export default async function BookingsPage() {
  const session = (await auth()) as unknown as SessionType;

  const userData = (await getUserByEmail(
    session?.user?.email
  )) as unknown as UserType;

  const bookings = (await getBookingByUserId(
    userData?._id
  )) as unknown as Booking[];

  const today = new Date().toISOString().split("T")[0];

  const pastBookings = bookings
    .filter((booking) => {
      if (new Date(booking.checkOut).getTime() < new Date(today).getTime()) {
        return booking;
      }
    })
    ?.map((booking) => {
      return {
        ...booking,
        pricePerNight: booking?.hotel?.price,
        numberOfNights: dayDifference(booking.checkIn, booking.checkOut),
        status: "completed",
      };
    });

  const upcomingBookings = bookings
    .filter((booking) => {
      if (new Date(booking.checkIn).getTime() >= new Date(today).getTime()) {
        return booking;
      }
    })
    ?.map((booking) => {
      return {
        ...booking,
        pricePerNight: booking?.hotel?.price,
        numberOfNights: dayDifference(booking.checkIn, booking.checkOut),
        status: "confirmed",
      };
    });

  if (!session) {
    return redirect("/login");
  }

  const user = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    avatar: session?.user?.name[0],
  };

  return (
    <div className="container mx-auto px-4 py-8 max-width">
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user?.image} alt={user?.name} />
          <AvatarFallback className="text-2xl dark:bg-sky-800 dark:text-sky-100">
            {user.avatar}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-1 dark:text-sky-100">
          {user.name}
        </h1>
        <p className="text-muted-foreground dark:text-sky-300">{user.email}</p>
      </div>

      {/* Bookings Tabs */}
      <Card className="dark:bg-sky-900 dark:border-sky-800">
        <CardContent className="p-6">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 dark:bg-sky-800">
              <TabsTrigger
                value="upcoming"
                className="dark:data-[state=active]:bg-violet-600 dark:text-sky-100"
              >
                Upcoming Bookings
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="dark:data-[state=active]:bg-violet-600 dark:text-sky-100"
              >
                Past Bookings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <BookingList bookings={upcomingBookings} type="upcoming" />
            </TabsContent>
            <TabsContent value="past">
              <BookingList bookings={pastBookings} type="past" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
