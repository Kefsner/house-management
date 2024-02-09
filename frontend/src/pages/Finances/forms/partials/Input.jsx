import React from "react";

import "./Input.css";

export default function Input(props) {
  // Prepare an object that conditionally includes additional props
  const additionalProps = {};
  if (props.type === "number") {
    if (props.min) {
      additionalProps.min = props.min;
    }
    if (props.step) {
      additionalProps.step = props.step;
    }
  }

  return (
    <div className="form-input-container">
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className="form-input"
        placeholder=""
        required={props.required || false}
        {...additionalProps} // Spread additional props conditionally
      />
      <label htmlFor={props.id} className="form-input-label">
        {props.label}
      </label>
    </div>
  );
}
