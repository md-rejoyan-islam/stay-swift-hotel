import { BookingCard } from "./booking-card";

interface Booking {
  id: number;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  pricePerNight: number;
  numberOfNights: number;
  status: string;
}

interface BookingListProps {
  bookings: Booking[];
  type: "upcoming" | "past";
}

export function BookingList({ bookings, type }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground dark:text-sky-300">
          No {type} bookings found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} type={type} />
      ))}
    </div>
  );
}
