import React from "react";

export default function Message(props) {
    console.log(props.message);

    return (
      <div className={`${props.className} ${props.success ? "success" : "error"}`}>
        {props.success ? (
          <>
            <p>{`${props.message}!`}</p>
            <p>Faça login para continuar.</p>
          </>
        ) : (
          props.message.map((msg, index) => (
            <p key={index}>{msg + ';'}</p>
          ))
        )}
      </div>
    );
}