import React from "react";
import { useState } from "react";

import { getCsrfToken } from "../utils/utils";

import AuthForm from "./AuthForm";

import "./Auth.css";

const apiURL = process.env.REACT_APP_API_URL;

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const data = {
    username,
    password,
    ...(isRegister && { confirmPassword })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const csrfToken = getCsrfToken();

    console.log(data)

    try {
      const response = await fetch(`${apiURL}auth/${isRegister ? "register" : "login"}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        // Handle success
        console.log("Success: ", responseData);
      } else {
        // Handle error
        console.log("Error: ", responseData);
      }

    } catch (exception) {
      // Handle exception
      console.log("Exception: ", exception);
    }
  };

  return (
    <div className="bg-image">
      <div className="content-container">
        <img src="/logo.png" alt="Logo" />
        <AuthForm
          data={data}
          handleSubmit={handleSubmit}
          setUsername={setUsername}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setIsRegister={setIsRegister}
          isRegister={isRegister}
        />
      </div>
    </div>
  );
}

export default Auth;