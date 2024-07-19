import React, { useState, useEffect } from 'react';
import validateDOB from '../../functions/validateDOB';

const DOBInput = ({ label, name, value, onChange, required, error }) => {
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    if (value) {
      setDisplayDate(value); // Initialize displayDate with the provided value
    }
  }, [value]);

  const handleChange = (e) => {
    let inputDate = e.target.value;

    // Remove any characters that are not digits or /
    inputDate = inputDate.replace(/[^\d/]/g, '');

    // Update state with raw input for visual feedback
    setDisplayDate(inputDate);

    // Call onChange with raw input
    onChange(name, inputDate);
  };

  return (
    <div className="form-group col-sm-12 col-md-6 col-lg-4">
      <label className="col-form-label">
        {label} {required && '*'}
      </label>
      <input
        className={`mainInfo form-control ${error ? 'is-invalid' : ''}`}
        placeholder="jj/mm/aaaa"
        type="text"
        name={name}
        value={displayDate}
        onChange={handleChange}
      />
      
    </div>
  );
};

export default DOBInput;
