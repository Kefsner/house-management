import React from "react";
import "./Modal.scss"; // Importing CSS for styling

/**
 * A component for rendering a modal dialog overlay.
 * It displays content in a modal overlay based on the `isOpen` prop. When `isOpen` is true,
 * the modal is displayed; otherwise, it returns null, effectively hiding the modal.
 * The content within the modal is determined by the `children` prop, allowing for versatile use cases.
 */
export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
      </div>
    </div>
  );
}

/**
 * Defines the props for the Modal component.
 */
interface ModalProps {
  isOpen: boolean; // Controls the visibility of the modal.
  children: React.ReactNode; // The content to be displayed within the modal.
}
