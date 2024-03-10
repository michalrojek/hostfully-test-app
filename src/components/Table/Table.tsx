import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../../app/store";
import { Booking, deleteBooking } from "../../features/bookings/bookingsSlice";
import "./Table.css";
import useTable from "./hooks/useTable";

const NAME = "name";
const START_DATE = "start_date";
const END_DATE = "end_date";

const Table = (): JSX.Element => {
  const bookings = useSelector((state: Store) => state.bookings.bookings);
  const dispatch = useDispatch();
  const {
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
  } = useTable();

  const renderEditableRow = useCallback(
    (booking: Booking, bookingIndex: number): JSX.Element => {
      return (
        <tr key={booking.name + bookingIndex}>
          <td>
            <input id={NAME} name={NAME} onChange={handleNameChange} type="text" value={name} />
          </td>
          <td>
            <input id={START_DATE} name={START_DATE} onChange={handleStartDateChange} type="date" value={startDate} />
          </td>
          <td>
            <input id={END_DATE} name={END_DATE} onChange={handleEndDateChange} type="date" value={endDate} />
          </td>
          <td>
            <button onClick={() => handleSubmit()}>Save</button>
            <button onClick={() => setEditedBooking(-1)}>Cancel</button>
          </td>
        </tr>
      );
    },
    [
      handleNameChange,
      name,
      handleStartDateChange,
      startDate,
      handleEndDateChange,
      endDate,
      handleSubmit,
      setEditedBooking,
    ]
  );

  const renderTableBody = useCallback(
    (bookings: Booking[]): JSX.Element[] => {
      return bookings.map((booking, bookingIndex: number) => {
        if (editedBooking === bookingIndex) {
          return renderEditableRow(booking, bookingIndex);
        }
        return (
          <tr key={booking.name + bookingIndex}>
            <td>{booking.name}</td>
            <td>{booking.startDate}</td>
            <td>{booking.endDate}</td>
            <td>
              <button onClick={() => handleEditBooking(booking, bookingIndex)}>Edit</button>
              <button onClick={() => dispatch(deleteBooking(bookingIndex))}>Delete</button>
            </td>
          </tr>
        );
      });
    },
    [dispatch, editedBooking, handleEditBooking, renderEditableRow]
  );

  return (
    <div>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Name of property</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{renderTableBody(bookings)}</tbody>
      </table>
    </div>
  );
};

export default Table;
