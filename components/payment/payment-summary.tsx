import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BookingDetails {
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
  pricePerNight: number;
  numberOfNights: number;
  taxes: number;
  serviceFee: number;
}

interface PaymentSummaryProps {
  booking: BookingDetails;
}

export function PaymentSummary({ booking }: PaymentSummaryProps) {
  const subtotal = booking.pricePerNight * booking.numberOfNights;
  const total = subtotal + booking.taxes + booking.serviceFee;

  return (
    <Card className="dark:bg-sky-900/50 dark:border-sky-800">
      <CardHeader>
        <CardTitle className="text-lg dark:text-sky-100">
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2 dark:text-sky-100">
            {booking.hotelName}
          </h3>
          <p className="text-sm text-muted-foreground dark:text-sky-300">
            {booking.location}
          </p>
        </div>

        <div className="flex items-center text-sm">
          <div className="grid gap-1 flex-1 dark:text-sky-200">
            <div>Check-in</div>
            <div className="font-medium dark:text-sky-100">
              {new Date(booking.checkIn).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="grid gap-1 flex-1 dark:text-sky-200">
            <div>Check-out</div>
            <div className="font-medium dark:text-sky-100">
              {new Date(booking.checkOut).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-1 text-sm dark:text-sky-200">
          <div>Guests</div>
          <div className="font-medium dark:text-sky-100">
            {booking.guests} guests · {booking.rooms} room ·{" "}
            {booking.numberOfNights} nights
          </div>
        </div>

        <Separator className="dark:border-sky-800" />

        <div className="space-y-2">
          <div className="flex justify-between text-sm dark:text-sky-200">
            <div>
              ${booking.pricePerNight} × {booking.numberOfNights} nights
            </div>
            <div>${subtotal}</div>
          </div>
          <div className="flex justify-between text-sm dark:text-sky-200">
            <div>Taxes</div>
            <div>${booking.taxes}</div>
          </div>
          <div className="flex justify-between text-sm dark:text-sky-200">
            <div>Service fee</div>
            <div>${booking.serviceFee}</div>
          </div>
        </div>

        <Separator className="dark:border-sky-800" />

        <div className="flex justify-between font-medium dark:text-sky-100">
          <div>Total</div>
          <div>${total}</div>
        </div>
      </CardContent>
    </Card>
  );
}
