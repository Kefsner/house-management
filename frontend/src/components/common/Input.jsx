import React from 'react';

function Input(props) {
    return (
      <>
          {props.label && <label htmlFor={props.id}>{props.label}</label>}
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
          />
      </>
    );
  }

export default Input;