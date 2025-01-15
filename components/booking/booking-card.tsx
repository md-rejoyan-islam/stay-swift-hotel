import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { CalendarDays, MapPin } from "lucide-react";

interface BookingCardProps {
  booking: {
    id: string;
    hotelName: string;
    checkIn: string;
    checkOut: string;
    pricePerNight: number;
    numberOfNights: number;
    status: string;
    hotel: {
      name: string;
      city: string;
    };
  };
  type: "upcoming" | "past";
}

export function BookingCard({ booking }: BookingCardProps) {
  const statusColors = {
    confirmed: "bg-green-500",
    pending: "bg-yellow-500",
    completed: "bg-blue-500",
    cancelled: "bg-red-500",
  };

  const totalPrice = booking.pricePerNight * booking.numberOfNights;

  return (
    <Card className="overflow-hidden dark:bg-sky-900/50 dark:border-sky-800 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-1 dark:text-sky-100">
                  {booking?.hotel?.name}
                </h3>
                <div className="flex items-center text-muted-foreground dark:text-sky-300">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{booking?.hotel?.city}</span>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={`${
                  statusColors[booking?.status as keyof typeof statusColors]
                } text-white`}
              >
                {booking?.status?.charAt(0).toUpperCase() +
                  booking?.status?.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <CalendarDays className="h-4 w-4 text-muted-foreground dark:text-sky-300" />
              <div className="text-sm dark:text-sky-200">
                <div>
                  Check In: {format(new Date(booking.checkIn), "MMM dd, yyyy")}
                </div>
                <div>
                  Check Out:{" "}
                  {format(new Date(booking.checkOut), "MMM dd, yyyy")}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold dark:text-sky-100">
                ${totalPrice}
              </div>
              <p className="text-sm text-muted-foreground dark:text-sky-300">
                ${booking.pricePerNight} per night × {booking.numberOfNights}{" "}
                nights
              </p>
            </div>

            {/* {type === "upcoming" && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="dark:border-sky-700 dark:text-sky-100 dark:hover:bg-sky-800"
                >
                  Modify
                </Button>
                <Button variant="destructive">Cancel</Button>
              </div>
            )} */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
