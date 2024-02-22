import React from "react";

import "./Button.scss";

/**
 * Properties for the button component.
 */
interface ButtonProps {
  type: "button" | "submit" | "reset"; // Optional, with a default of "button".
  onClick?: () => void; // Click event handler.
  label: string; // Text label displayed on the button.
  disabled?: boolean; // Optional, indicates if the button is disabled.
}

/**
 * Renders a customizable button component.
 *
 * This component supports different button types (submit, button, reset), custom styles via className,
 * and a disabled state. It provides a flexible interface for button elements across the application,
 * ensuring consistent styling and behavior.
 *
 * @param {ButtonProps} props - The properties passed to the button component, determining its configuration and behavior.
 * @returns {JSX.Element} A JSX element representing the configured button.
 */
export default function Button(props: ButtonProps): JSX.Element {
  return (
    <button
      type={props.type} // Set the button's type (submit, button, reset).
      onClick={props.onClick} // Attach the click event handler.
      className="form-button" // Apply styling from the Button.scss stylesheet.
      disabled={props.disabled} // Optionally disable the button.
    >
      {props.label}
    </button>
  );
}