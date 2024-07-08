import React, { useState, useEffect } from 'react';
import moment from 'moment';
import validateDOB from '../../functions/validateDOB';

const DOBInput = ({ label, name, value, onChange, required, error }) => {
  const [localError, setLocalError] = useState(''); // State to manage local validation
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    if (value) {
      const formattedDate = moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
      setDisplayDate(formattedDate);
    }
  }, [value]);

  const handleChange = (e) => {
    let inputDate = e.target.value;

    // Remove any characters that are not digits or /
    inputDate = inputDate.replace(/[^\d/]/g, '');

    // Validate using validateDOB function
    const dateError = validateDOB(inputDate);
    setLocalError(dateError);

    setDisplayDate(inputDate);
    onChange(name, dateError ? '' : moment(inputDate, 'DD/MM/YYYY').format('YYYY-MM-DD'));
  };

  return (
    <div className="form-group col-sm-12 col-md-6 col-lg-4">
      <label className="col-form-label">
        {label} {required && '*'}
      </label>
      <input
        className={`mainInfo form-control ${error || localError ? 'is-invalid' : ''}`}
        placeholder="jj/mm/aaaa"
        type="text"
        name={name}
        value={displayDate}
        onChange={handleChange}
        required={required}
      />
      {(error || localError) && <div className="invalid-feedback">{error || localError}</div>}
    </div>
  );
};

export default DOBInput;
