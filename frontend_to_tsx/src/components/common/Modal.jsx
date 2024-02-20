import React from "react";

import "./Modal.css";

export default function Modal(props) {
  if (!props.isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        {props.children}
      </div>
    </div>
  );
}
