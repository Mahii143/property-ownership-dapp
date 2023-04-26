import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const PropertyForm = ({ addProperty }) => {
  const [details, setDetails] = useState('');
  const [rate, setRate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addProperty(details, rate);
    // Clear form fields after submission
    setDetails('');
    setRate('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
        />
        <input
          type="number"
          placeholder="Rate"
          value={rate}
          onChange={(event) => setRate(event.target.value)}
        />
        <button type="submit">Add Property</button>
      </form>
      <Link to="../">Go Back</Link>

    </>
  );
};

export default PropertyForm;
