import React from "react";

import "./Input.scss";

/**
 * Base properties shared by all input types.
 */
interface BaseInputProps {
  id: string; // Unique identifier for the input element.
  value: string; // Current value of the input.
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
 * This component automatically adjusts available attributes based on the input type specified, such as adding
 * `min` and `step` properties for number inputs. It uses a flexible design to accommodate different input requirements
 * while maintaining a consistent interface and styling.
 *
 * @param {InputProps} props - The properties passed to the input component, determining its configuration and behavior.
 * @returns {JSX.Element} A JSX element representing the configured input field and its label.
 */
export default function Input(props: InputProps): JSX.Element {
  return (
    <div className="form-input-container">
      <input
        id={props.id} // Associate the input with its label using the ID.
        type={props.type} // Set the input's type (text, password, email, number).
        value={props.value} // Bind the input's value to the provided value prop.
        onChange={props.onChange} // Attach the change event handler.
        className={`form-input ${props.error && "error"}`} // Apply conditional styling for errors.
        required={props.required} // Optionally mark the input as required.
        {...(props.type === "number" && { // Conditionally add number-specific attributes.
          min: props.min, // Set the minimum value if provided.
          step: props.step, // Set the step interval if provided.
        })}
        placeholder="" // Clear the default placeholder for styling consistency.
        {...(props.type === "text" || props.type === "password") && { // Conditionally add text-specific attributes.
          maxLength: props.maxlength, // Set the maximum length if provided.
          minLength: props.minlength, // Set the minimum length if provided.
        }}
      />
      <label htmlFor={props.id} className="form-input-label">
        {props.label}
      </label>
      {/* Optional error message to display below the input */}
      {props.error && <span className="form-input-error">{props.error}</span>}
    </div>
  );
}
