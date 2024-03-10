import { configureStore } from "@reduxjs/toolkit";
import bookingsReducer, { BookingsSlice } from "../features/bookings/bookingsSlice";

export type Store = {
  bookings: BookingsSlice;
};

export default configureStore({
  reducer: {
    bookings: bookingsReducer,
  },
});
