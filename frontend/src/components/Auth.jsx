import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCsrfToken, isAuthenticated } from "../utils/utils";

import AuthForm from "./AuthForm";

import "./Auth.css";

const apiURL = process.env.REACT_APP_API_URL;

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const data = {
    username,
    password,
    ...(isRegister && { confirmPassword }),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCsrfToken();

    try {
      const response = await fetch(
        `${apiURL}auth/${isRegister ? "register" : "login"}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", responseData.access);
        localStorage.setItem("refreshToken", responseData.refresh);
        navigate("/");
      } else {
        setErrorMessage(responseData.error);
        setPassword("");
        setConfirmPassword("");
      }
    } catch (exception) {
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
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}

export default Auth;
