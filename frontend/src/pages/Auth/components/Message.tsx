import React from "react";

/**
 * Displays a message to the user, with styling based on the message type.
 * The message can be a single string or multiple strings separated by semicolons,
 * which will be split and displayed as separate paragraphs.
 * 
 * @param {MessageProps} props The properties for the Message component.
 * @param {string} props.message The message text to display. Can include multiple messages separated by semicolons.
 * @param {"error" | "info"} props.type The type of the message, which affects styling. Can be "error" for errors or "info" for informational messages.
 */
export default function Message(props: MessageProps) {
  // Splits the message by semicolons and filters out any empty strings resulting from the split.
  const message = props.message.split(";").filter((msg) => msg.trim() !== "");
  return (
    <div className={`message ${props.type}`}>
      {message.map((msg, index) => (
        <p key={index} className="message-text">
          {msg}
        </p>
      ))}
    </div>
  );
}

/**
 * Defines the props expected by the Message component.
 */
interface MessageProps {
  message: string; // The message text to be displayed. Can be a single message or multiple messages separated by semicolons.
  type: "error" | "info"; // The type of message, affecting the styling. "error" for error messages, "info" for informational messages.
}