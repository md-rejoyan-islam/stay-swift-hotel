import { format, isAfter, isBefore, isEqual, parseISO } from "date-fns";

export const ratingToCondition = (rating: number) => {
  let condition;

  switch (rating) {
    case 0:
      condition = "Not Rated";
      break;
    case 1:
    case 2:
      condition = "Fair";
      break;
    case 3:
      condition = "Good";
      break;
    case 4:
      condition = "Very Good";
      break;
    case 5:
      condition = "Excellent";
      break;
    default:
      condition = "Bad";
      break;
  }
  return condition;
};

export async function isHotelBooked(
  checkIn: string | undefined,
  checkOut: string | undefined,
  booking: any
) {
  if (!booking?.checkIn || !booking?.checkOut) return false;

  const bookingCheckIn = booking.checkIn.toISOString().split("T")[0];
  const bookingCheckOut = booking.checkOut.toISOString().split("T")[0];

  if (checkIn && checkOut) {
    const checkInDate = parseISO(checkIn);
    const checkOutDate = parseISO(checkOut);

    return (
      (isBefore(bookingCheckIn, checkOutDate) ||
        isEqual(bookingCheckIn, checkOutDate)) &&
      (isAfter(bookingCheckOut, checkInDate) ||
        isEqual(bookingCheckOut, checkInDate))
    );
  } else if (checkIn) {
    const checkInDate = parseISO(checkIn);
    return (
      isAfter(bookingCheckOut, checkInDate) ||
      isEqual(bookingCheckOut, checkInDate)
    );
  } else if (checkOut) {
    const checkOutDate = parseISO(checkOut);
    return (
      isBefore(bookingCheckIn, checkOutDate) ||
      isEqual(bookingCheckIn, checkOutDate)
    );
  }

  return false;
}

export const dayDifference = (checkIn: string, checkOut: string) => {
  const checkInDate = new Date(format(checkIn, "yyyy-MM-dd")).getTime();
  const checkOutDate = new Date(format(checkOut, "yyyy-MM-dd")).getTime();

  return Math.abs(checkOutDate - checkInDate) / 86400000;
};
