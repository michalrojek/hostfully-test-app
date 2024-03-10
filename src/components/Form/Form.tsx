import "./Form.css";
import useForm from "./hooks/useForm";

const NAME = "name";
const START_DATE = "start_date";
const END_DATE = "end_date";

const Form = (): JSX.Element => {
  const { name, startDate, endDate, handleNameChange, handleStartDateChange, handleEndDateChange, handleSubmit } =
    useForm();

  return (
    <div className="booking-form">
      <label htmlFor={NAME}>Name of property</label>
      <input id={NAME} name={NAME} onChange={handleNameChange} type="text" value={name} />
      <label htmlFor={START_DATE}>Start date</label>
      <input id={START_DATE} name={START_DATE} onChange={handleStartDateChange} type="date" value={startDate} />
      <label htmlFor={END_DATE}>End date</label>
      <input id={END_DATE} name={END_DATE} onChange={handleEndDateChange} type="date" value={endDate} />
      <button onClick={() => handleSubmit()}>Add</button>
    </div>
  );
};

export default Form;
