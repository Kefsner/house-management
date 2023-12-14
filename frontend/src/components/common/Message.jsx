import React from "react";

export default function Message(props) {
    return (
      <div className={`${props.className} ${props.success ? "success" : "error"}`}>
        <p>
          {`${props.message}!`}
        </p>
        <p>
          {props.success && "Faça login para continuar"}
        </p>
      </div>
    );
  }