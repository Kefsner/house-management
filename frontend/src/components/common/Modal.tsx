import React from "react";
import "./Modal.css"; // Importing CSS for styling

/**
 * Props expected by the Modal component.
 * 
 * @param {boolean} isOpen - Controls the visibility of the modal. If false, the modal is not rendered.
 * @param {React.ReactNode} children - The content to be displayed within the modal. This can include any valid React elements or components.
 */
interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

/**
 * Renders a modal dialog overlay.
 * 
 * This component creates a modal dialog overlay that can be toggled visible or hidden based on the `isOpen` prop. 
 * The modal's content is flexible and determined by the `children` prop, allowing for a wide variety of uses such as 
 * forms, information dialogs, or custom content displays. The modal is designed to be a reusable and accessible way 
 * to present content in an overlay, focusing user interaction within the modal content until closed.
 *
 * @param {ModalProps} props The properties to configure the modal component.
 * @returns {JSX.Element | null} A JSX element representing the modal overlay and its content if `isOpen` is true; otherwise, null.
 */
export default function Modal(props: ModalProps): JSX.Element | null {
  if (!props.isOpen) return null; // Prevents the modal from being rendered if not open

  return (
    <div className="modal-overlay"> {/* The overlay that covers the viewport */}
      <div className="modal"> {/* The modal container itself */}
        {props.children} {/* The content passed into the Modal component */}
      </div>
    </div>
  );
}