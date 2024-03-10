import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Booking = {
  name: string;
  startDate: string;
  endDate: string;
};

export type BookingsSlice = {
  bookings: Booking[];
};

type EditBookingPayload = {
  bookingIndex: number;
  booking: Booking;
};

const initialState: BookingsSlice = {
  bookings: [],
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>): void => {
      state.bookings.push(action.payload);
    },
    editBooking: (state, action: PayloadAction<EditBookingPayload>): void => {
      state.bookings[action.payload.bookingIndex] = action.payload.booking;
    },
    deleteBooking: (state, action: PayloadAction<number>): void => {
      state.bookings.splice(action.payload, 1);
    },
  },
});

export const { addBooking, editBooking, deleteBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;
