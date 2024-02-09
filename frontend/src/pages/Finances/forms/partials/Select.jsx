import React from "react";

import "./Select.css";

export default function Select(props) {
  return (
    <div className="form-select-container">
      <select
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className="form-select"
        required={props.required || false}
      >
        <option value="" disabled hidden>
            {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={option.value || option.name} value={option.value || option.name}>
            {option.label || option.name}
          </option>
        ))}
      </select>
      <label htmlFor={props.id} className="form-select-label">
        {props.label}
      </label>
    </div>
  );
}
