import React from "react";

interface MessageProps {
  message: string;
  type: "error" | "info";
}

export default function Message(props: MessageProps) {
  return (
    <div className={`message ${props.type}`}>
      {props.message}
    </div>
  );
}
