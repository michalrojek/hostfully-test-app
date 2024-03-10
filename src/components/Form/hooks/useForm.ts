import { useState, ChangeEvent, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../../features/bookings/bookingsSlice";
import { Store } from "../../../app/store";
import { validate } from "../../../utils/validators";

type FormApi = {
  name: string;
  startDate: string;
  endDate: string;
  handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleStartDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};

const useForm = (): FormApi => {
  const bookings = useSelector((state: Store) => state.bookings.bookings);
  const dispatch = useDispatch();
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
    const message = validate(name, startDate, endDate, bookings);
    if (message) {
      alert(message);
    } else {
      dispatch(addBooking({ name, startDate, endDate }));
      setName("");
      setStartDate("");
      setEndDate("");
    }
  }, [name, startDate, endDate, bookings, dispatch]);

  return useMemo((): FormApi => {
    return {
      name,
      startDate,
      endDate,
      handleNameChange,
      handleStartDateChange,
      handleEndDateChange,
      handleSubmit,
    };
  }, [name, startDate, endDate, handleNameChange, handleStartDateChange, handleEndDateChange, handleSubmit]);
};

export default useForm;
