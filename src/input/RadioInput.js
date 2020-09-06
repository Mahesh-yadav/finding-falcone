import React from 'react';

const RadioInput = ({ id, checked, disabled, labelText, onChange }) => {
  return (
    <div className="form-check mb-1">
      <input
        className="form-check-input mt-2"
        id={id}
        type="radio"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />{' '}
      <label htmlFor={id} className="form-check-label">
        {labelText}
      </label>
    </div>
  );
};

export default RadioInput;
