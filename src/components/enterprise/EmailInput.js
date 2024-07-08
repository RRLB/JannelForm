import React, { useState } from 'react';

const EmailInput = ({ label, name, value, onChange, required, error }) => {
//   const [isValid, setIsValid] = useState(true); // State to manage local validation
  const [localError, setLocalError] = useState(''); // State to manage local validation

  const handleChange = (e) => {
    const { value } = e.target;
    onChange(name, value); // Propagate the actual value to parent component
    
    // Validate email format locally
    let emailError = '';
    if(required && !value.trim()){
        emailError = 'Adresse e-mail est requise';
    } else if(value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
        emailError = 'Adresse e-mail invalide';
    }
    setLocalError(emailError);
    // const isValidLocal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    // setIsValid(isValidLocal);

    
  };

  return (
    <div className="form-group col-sm-12 col-md-6 col-lg-4">
      <label className="col-form-label">
        {label} {required && '*'}
      </label>
      <input
        className={`mainInfo form-control ${error || localError/* !isValid  */? 'is-invalid' : ''}`}
        placeholder={label}
        type="email"
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
      />
      {(error || localError/* !isValid */) && <div className="invalid-feedback">{error || localError }</div>}
    </div>
  );
};

export default EmailInput;
