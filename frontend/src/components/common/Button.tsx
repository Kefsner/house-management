import React from "react";

import "./Button.scss";

/**
 * Properties for the button component.
 */
interface ButtonProps {
  type?: "button" | "submit" | "reset"; // type The type of button, influencing its behavior in forms. Defaults to "button" if not specified.
  onClick?: () => void; // Optional click event handler for the button.
  label: string; // The text label displayed on the button.
  disabled?: boolean; // Indicates whether the button is disabled, preventing user interaction.
}

/**
 * Renders a customizable button component, supporting various configurations such as button type, disabled state, and click event handling.
 * 
 * The Button component is designed for flexibility and reusability throughout the application, ensuring consistent styling and functionality.
 * It can be easily integrated into forms or used standalone, offering a standardized approach to handling user interactions.
 * 
 */
export default function Button(props: ButtonProps) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className="form-button"
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
}