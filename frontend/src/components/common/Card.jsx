import React from "react";

export default function Card(props) {
  return (
    <div className="card">
        <button className={props.className} onClick={props.onClick}>
            <img src={props.icon} alt={props.text} />
            <span>{props.text}</span>
        </button>
    </div>
  );
}
