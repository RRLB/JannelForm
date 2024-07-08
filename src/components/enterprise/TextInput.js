import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const TextInput = ({ label, name, value, onChange, required, error }) => {
  const isTelephoneField = name === 'telephone';

  const handleChange = (value) => {
    if (value !== null && value !== undefined) {
      onChange(name, value.toString());
    } else {
      onChange(name, ''); // Or handle the null/undefined case appropriately
    }
  };

  return (
    <div className="form-group col-sm-12 col-md-6 col-lg-4">
      <label className="col-form-label">{label} {required && '*'}</label>
      {isTelephoneField ? (
        <PhoneInput
          international
          defaultCountry="FR"
          value={value}
          onChange={handleChange}
          className={`mainInfo form-control ${error ? 'is-invalid' : ''}`}
        />
      ) : (
        <input
          className={`mainInfo form-control ${error ? 'is-invalid' : ''}`}
          placeholder={label}
          type="text"
          name={name}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required={required}
        />
      )}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TextInput;
