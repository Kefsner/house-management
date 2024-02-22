import React from "react";
import "./Select.scss";

/**
 * A customizable and accessible select component with validation error display.
 * Supports required validation, placeholder for guidance, and custom styling.
 */
export default function Select(props: SelectProps) {
  return (
    <div className="form-select-container">
      <select
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        className={`form-select ${props.error ? "error" : ""}`}
        required={props.required}
      >
        <option value="" disabled hidden>
          {props.placeholder}
        </option>
        {props.options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label htmlFor={props.id} className="form-select-label">
        {props.label}
      </label>
      {props.error && <span className="form-select-error">{props.error}</span>}
    </div>
  );
}

/**
 * Defines the structure for an individual option in the select dropdown.
 */
interface Option {
  id: string; // Unique identifier for the option, used for accessibility
  value: string; // The value to be sent to the server
  label: string; // The label shown to the user
}

/**
 * Props expected by the Select component.
 */
interface SelectProps {
  id: string; // Unique identifier for the select element, used for accessibility.
  value: string; // Currently selected value.
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Function to call on changing the selected option.
  label: string; // Text label for the select, for accessibility and usability.
  placeholder: string; // Placeholder text shown as the initial unselectable option.
  options: Option[]; // Array of options for the user to choose from.
  required?: boolean; // Marks the select as required in forms, not necessary by default.
  error?: string; // Optional error message to display below the select.
}