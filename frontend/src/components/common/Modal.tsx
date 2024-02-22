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
