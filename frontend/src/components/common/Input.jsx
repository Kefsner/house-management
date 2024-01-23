import React from "react";

export default function Input(props) {
  return (
    <>
      {props.label && (
        <label htmlFor={props.id} className={props.className}>
          {props.label}
        </label>
      )}
      <input
        type={props.type}
        id={props.id}
        autoComplete={props.autoComplete}
        value={props.value}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        required={props.required}
        minLength={props.minLength}
        maxLength={props.maxLength}
        className={props.className}
        step={props.step}
        min={props.min}
        max={props.max}
        placeholder={props.placeholder}
      />
    </>
  );
}
