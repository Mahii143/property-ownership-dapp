import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const PropertyForm = ({ data,updateProperty, addProperty }) => {
  const [details, setDetails] = useState('');
  const [rate, setRate] = useState('');
  const {id} = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    addProperty(details, rate);
    // Clear form fields after submission
    setDetails('');
    setRate('');
  };
  
  const handleUpdate = (event) => { 
    event.preventDefault();
    updateProperty(id, details, rate); 
    setDetails('');
    setRate('');
  }

  if (!data) {
    // console.log(data);
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
  } else {
    return (
      <>
        <form onSubmit={handleUpdate}>
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
          <button type="submit">Update Property</button>
        </form>
        <Link to="../">Go Back</Link>

      </>
    );
  }
};

export default PropertyForm;
