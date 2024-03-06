import React from "react";

import "./Input.scss";

/**
 * Base properties shared by all input types.
 */
interface BaseInputProps {
  id: string; // Unique identifier for the input element.
  value: string // Current value of the input.
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for change events on the input.
  label: string; // Text label for the input.
  required?: boolean; // Indicates if the input is required for form submission.
  error?: string; // Optional error message to display below the input.
}

/**
 * Properties specific to inputs that accept numerical values.
 */
interface NumberInputProps extends BaseInputProps {
  type: "number"; // Designates the input as a number type.
  min?: number; // Minimum value allowed.
  step?: number; // Step interval between values.
}

/**
 * Properties for text-based inputs, including text, password, and email fields.
 */
interface TextInputProps extends BaseInputProps {
  type: "text" | "password" | "email"; // Defines the type of text input.
  maxlength?: number; // Maximum length for the input value.
  minlength?: number; // Minimum length for the input value.
}

/**
 * Union type for input properties, covering both number and text input variations.
 */
type InputProps = NumberInputProps | TextInputProps;

/**
 * Renders a customizable input component, supporting various types including text, password, email, and number.
 *
 * This component adapts its attributes based on the input type, supporting `min` and `step` for number inputs,
 * and adjusting validation attributes for text inputs. It offers a unified look and feel while providing specific
 * functionality tailored to the input type, ensuring usability and accessibility.
 */
export default function Input(props: InputProps) {
  return (
    <div className="form-input-container">
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        className={`form-input ${props.error && "error"}`}
        required={props.required}
        {...(props.type === "number" && { 
          min: props.min,
          step: props.step,
        })}
        placeholder=""
        {...(props.type === "text" || props.type === "password") && {
          maxLength: props.maxlength,
          minLength: props.minlength,
        }}
      />
      <label htmlFor={props.id} className="form-input-label">
        {props.label}
      </label>
      {props.error && <span className="form-input-error">{props.error}</span>}
    </div>
  );
}
