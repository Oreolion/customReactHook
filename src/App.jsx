import { useState } from 'react';


function useDate() {
  const date = new Date();

  const addDay = (numberOfDays, baseDate = date) => {
    const newDate = new Date(baseDate);
    newDate.setDate(newDate.getDate() + numberOfDays);

    return newDate;
    //N.B if day after adding is greater than number of days for that month, date returned should be a new month date
  };

  const addMonth = (numberOfMonths, baseDate = date) => {
    const newDate = new Date(baseDate);
    newDate.setMonth(newDate.getMonth() + numberOfMonths);

    return newDate;
    //N.B if month after adding is greater than 11, date returned should be a new year
  };

  return { date, addDay, addMonth };
}

function Timer() {
  const { date, addDay, addMonth } = useDate();
  const [addedDay, setAddedDay] = useState(0);
  const [addedMonth, setAddedMonth] = useState(0);
  const [newdate, setNewdate] = useState(date.toString());

  const handleAddedDay = () => {
    setAddedDay(addedDay + 1);
  };

  const handleAddedMonth = () => {
    setAddedMonth(addedMonth + 1);
  };

  const handleAddedDaysAndMonths = () => {
    const resultDate = addMonth(addedMonth, addDay(addedDay));
    return resultDate.toString();
  };

  const newMonth = () => {
    return addMonth(addedMonth).getMonth() + 1;
  };

  const newDay = () => {
    return addDay(addedDay).getDate();
  };

  const handleReset = () => {
    setNewdate(date.toString());
    setAddedDay(0);
    setAddedMonth(0);
  };

  return (
    <div className="app">
      <h1>{newdate}</h1>

      <div>
        <p>
          Day: {newDay()}
          <span>
            {addedDay === 0
              ? null
              : addedDay === 1
              ? ` (+ ${addedDay} day)`
              : ` (+ ${addedDay} days)`}
          </span>
        </p>
        <button onClick={handleAddedDay}>Add Days</button>
      </div>

      <div>
        <p>
          Month: {newMonth()}
          <span>
            {addedMonth === 0
              ? null
              : addedMonth === 1
              ? ` (+ ${addedMonth} month)`
              : ` (+ ${addedMonth} months)`}
          </span>
        </p>
        <button onClick={handleAddedMonth}>Add Months</button>
      </div>

      <div className="action-btn">
        <button
          onClick={() => {
            setNewdate(handleAddedDaysAndMonths().toString());
          }}
          className="change-btn"
          title="Click to set new date"
        >
          Change The World!
        </button>
        <button onClick={handleReset} className="reset-btn">Reset</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <Timer />
    </div>
  );
}
