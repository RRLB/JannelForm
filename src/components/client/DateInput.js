import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone'; // Install moment-timezone if you don't have it

const DateInput = ({ label, name, date, timezone, onChange, required, error }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (date) {
      const localDate = moment.tz(date, timezone).format('DD/MM/YYYY');
      setFormattedDate(localDate);
    }
  }, [date, timezone]);

  const handleDateChange = (e) => {
    const { value } = e.target;
    const [day, month, year] = value.split('/');
    const newDate = moment.tz(`${year}-${month}-${day}`, timezone).toISOString();
    onChange(name, newDate);
  };

  return (
    <div className="form-group col-sm-12 col-md-6 col-lg-4">
      <label className="col-form-label">
        {label} {required && '*'}
      </label>
      <input
        className={`mainInfo form-control ${error ? 'is-invalid' : ''}`}
        placeholder="DD/MM/YYYY"
        type="text"
        name={name}
        value={formattedDate}
        onChange={handleDateChange}
        required={required}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timezone: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
};

export default DateInput;
