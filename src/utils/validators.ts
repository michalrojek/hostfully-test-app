import moment from "moment";
import { Booking } from "../features/bookings/bookingsSlice";

const isOverlaping = (
  startDate: string,
  endDate: string,
  bookings: Booking[],
  bookingIndex: number | null
): Booking | undefined => {
  return bookings.find(({ startDate: bookingStartDate, endDate: bookingEndDate }, index) => {
    return (
      index !== bookingIndex &&
      ((startDate <= bookingStartDate && bookingStartDate <= endDate) ||
        (startDate <= bookingEndDate && bookingEndDate <= endDate) ||
        (bookingStartDate < startDate && endDate < bookingEndDate))
    );
  });
};

export const validate = (
  name: string,
  startDate: string,
  endDate: string,
  bookings: Booking[],
  bookingIndex: number | null = -1
): string | null => {
  if (name.length < 1) {
    return "Provide name!";
  }
  if (!moment(startDate).isValid()) {
    return "Invalid start date!";
  }
  if (!moment(endDate).isValid()) {
    return "Invalid end date!";
  }
  if (Date.parse(startDate) > Date.parse(endDate)) {
    return "Start date cannot be later than end date!";
  }
  if (isOverlaping(startDate, endDate, bookings, bookingIndex)) {
    return "Dates overlap with existing booking!";
  }
  return null;
};
