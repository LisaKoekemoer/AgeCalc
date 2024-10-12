import { useState } from 'react';
import './App.css';
import arrow from './images/icon-arrow.svg';
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns";

function App() {
  const [days, setDays] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");
  const [daysError, setDaysError] = useState("");
  const [monthsError, setMonthsError] = useState("");
  const [yearsError, setYearsError] = useState("");
  const [resultsCalculated, setResultsCalculated] = useState(false);
  const [diffInDaysResults, setDiffInDaysResults] = useState("--");
  const [diffInMonthsResults, setDiffInMonthsResults] = useState("--");
  const [diffInYearsResults, setDiffInYearsResults] = useState("--");

  const handleCalculate = () => {
    const daysError = validateInput(days, 1, 31);
    const monthsError = validateInput(months, 1, 12);
    const yearsError = validateInput(years, 1900, 2024);

    setDaysError(daysError);
    setMonthsError(monthsError);
    setYearsError(monthsError);

    if (daysError || monthsError || yearsError ) {
      return;
    }

    const diffInDays = differenceInDays(
    new Date(years, months, 31),
    new Date(years, months, days)
    )

    const diffInMonths = differenceInMonths(
      new Date(years, 12, 31),
      new Date(years, months, days)
    )

    const diffInYears = differenceInYears(
      new Date(2024, 12, 31),
      new Date(years, months, days)
    )

    setDiffInDaysResults(diffInDays);
    setDiffInMonthsResults(diffInMonths);
    setDiffInYearsResults(diffInYears);
    setResultsCalculated(true);
  };

  const validateInput = (value, min, max) => {
    if (!value || value < min || value > max) {
      return `Value must be between ${min} and ${max}`;
    }
      return "";
  };

  return (
    <>
    <div className='calculator-wrapper'>
      {/* Birthdate Input */}
        <form className='birtdate-input'>
          <div>
            <label htmlFor="day">DAY</label>
            <input 
              type="number" 
              name='day'
              id='day'
              placeholder='DD'
              min={1}
              max={31}
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            {daysError && <p className='error-message'>{"Must be a valid date."}</p>}
          </div>
          <div>
            <label htmlFor="month">MONTH</label>
            <input 
              type="number" 
              name='month'
              id='month'
              placeholder='MM'
              min={1}
              max={12}
              value={months}
              onChange={(e) => setMonths(e.target.value)}
            />
            {monthsError && <p className='error-message'>{"Must be a valid month."}</p>}
          </div>
          <div>
            <label htmlFor="year">YEAR</label>
            <input 
              type="number" 
              name='year'
              id='year'
              placeholder='YYYY'
              min={1900}
              max={2024}
              value={years}
              onChange={(e) => setYears(e.target.value)}
            />
            {yearsError && <p className='error-message'>{"Must be in the past."}</p>}
          </div>
        </form>

        <hr />
        <button type="submit" onClick={handleCalculate}>
          <img src={arrow} alt="" />
        </button>

        {/* Birthdate Output */}
        {/* {resultsCalculated && ( */}
          <div className='birthdate-output'>
            <div>
              <h1><span>{diffInYearsResults}</span> years</h1>
            </div>
            <div>
              <h1><span>{diffInMonthsResults}</span> months</h1>
            </div>
            <div>
              <h1><span>{diffInDaysResults}</span> days</h1>
            </div>
          </div>
        {/* )} */}
      </div>
    </>
  );
}

export default App;
