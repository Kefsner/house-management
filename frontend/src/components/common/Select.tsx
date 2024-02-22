import React from "react";
import "./Select.scss"; // Importing SCSS for styling

// Defines the structure for an individual option in the select dropdown
interface Option {
  id: string; // Unique identifier for the option, used for accessibility
  value: string; // The value to be sent to the server
  label: string; // The label shown to the user
}

// Props expected by the Select component
interface SelectProps {
  id: string; // Unique identifier for the select element, used for accessibility
  value: string; // Currently selected value
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Function to call on changing the selected option
  label: string; // Text label for the select, for accessibility and usability
  placeholder: string; // Optional placeholder text shown as the initial unselectable option
  options: Option[]; // Array of options for the user to choose from
  required?: boolean; // Marks the select as required in forms, not necessary by default
  error?: string; // Optional error message to display below the select
}

/**
 * Renders a customizable and accessible select component.
 *
 * This component provides a dropdown list of options for the user to select from. It supports a placeholder
 * for initial guidance, required validation, and custom styling through SCSS. The component is designed to be
 * flexible, allowing for use in various forms and interfaces.
 *
 * @param {SelectProps} props The properties to configure the select component.
 * @returns {JSX.Element} A JSX element representing the configured select field and its associated label.
 */
export default function Select(props: SelectProps): JSX.Element {
  return (
    <div className="form-select-container">
      {/* The select element with dynamic properties and options */}
      <select
        id={props.id} // Associates the select with its label
        value={props.value} // Controls the current selected value
        onChange={props.onChange} // Handles changes to the selection
        className={`form-select ${props.error && "error"}`} // Applies conditional styling for errors
        required={props.required} // Optionally marks the field as required
      >
        {/* Initial unselectable option with placeholder text */}
        <option value="" disabled hidden>
          {props.placeholder}
        </option>
        {/* Maps over the provided options to render them */}
        {props.options.map((option) => (
          <option
            key={option.id}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {/* Label for the select, for accessibility and usability */}
      <label htmlFor={props.id} className="form-select-label">
        {props.label}
      </label>
      {/* Optional error message to display below the select */}
      {props.error && <span className="form-select-error">{props.error}</span>}
    </div>
  );
}
