import React from "react";

import "./Button.css";

export default function Button(props) {
  return (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
