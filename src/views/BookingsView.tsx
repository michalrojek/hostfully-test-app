import Form from "../components/Form/Form";
import Table from "../components/Table/Table";
import "./BookingsView.css";

const BookingsView = (): JSX.Element => {
  return (
    <div className="bookings-view">
      <div>
        <h1>List of bookings</h1>
      </div>
      <div>
        <Form />
        <Table />
      </div>
    </div>
  );
};

export default BookingsView;
