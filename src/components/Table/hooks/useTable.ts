import { useCallback, useState, ChangeEvent, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../../app/store";
import { Booking, editBooking } from "../../../features/bookings/bookingsSlice";
import { validate } from "../../../utils/validators";

type TableApi = {
  editedBooking: number;
  name: string;
  startDate: string;
  endDate: string;
  handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleStartDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleEditBooking: (booking: Booking, bookingIndex: number) => void;
  setEditedBooking: (editedBooking: number) => void;
};

const useTable = (): TableApi => {
  const bookings = useSelector((state: Store) => state.bookings.bookings);
  const dispatch = useDispatch();
  const [editedBooking, setEditedBooking] = useState<number>(-1);
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setName(event.target.value);
  }, []);

  const handleStartDateChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setStartDate(event.target.value);
  }, []);

  const handleEndDateChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setEndDate(event.target.value);
  }, []);

  const handleSubmit = useCallback((): void => {
    const message = validate(name, startDate, endDate, bookings, editedBooking);
    if (message) {
      alert(message);
    } else {
      dispatch(editBooking({ bookingIndex: editedBooking, booking: { name, startDate, endDate } }));
      setEditedBooking(-1);
      setName("");
      setStartDate("");
      setEndDate("");
    }
  }, [name, startDate, endDate, bookings, editedBooking, dispatch]);

  const handleEditBooking = useCallback((booking: Booking, bookingIndex: number): void => {
    setEditedBooking(bookingIndex);
    setName(booking.name);
    setStartDate(booking.startDate);
    setEndDate(booking.endDate);
  }, []);

  return useMemo((): TableApi => {
    return {
      editedBooking,
      name,
      startDate,
      endDate,
      handleNameChange,
      handleStartDateChange,
      handleEndDateChange,
      handleSubmit,
      handleEditBooking,
      setEditedBooking,
    };
  }, [
    editedBooking,
    name,
    startDate,
    endDate,
    handleNameChange,
    handleStartDateChange,
    handleEndDateChange,
    handleSubmit,
    handleEditBooking,
  ]);
};

export default useTable;
