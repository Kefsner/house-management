import React from "react";

function Message(props) {
    return (
      <div className={`message ${props.success ? "success" : "error"}`}>
        <p>
          {props.message}
        </p>
        <p>
          {props.success && "Faça login para continuar"}
        </p>
      </div>
    );
  }

export default Message;