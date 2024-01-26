import React from "react";

export default function Message(props) {
  const messageArray = Array.isArray(props.message)
    ? props.message
    : [props.message];
  return (
    <div
      className={`${props.className} ${props.success ? "success" : "error"}`}
    >
      {props.success ? (
        <>
          <p>{`${props.message}!`}</p>
          <p>Faça login para continuar.</p>
        </>
      ) : (
        messageArray.map((msg, index) => <p key={index}>{msg}</p>)
      )}
    </div>
  );
}
