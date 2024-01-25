import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCsrfToken,
  isAuthenticated,
  logErrorToServer,
} from "../../../utils/utils";

import AuthForm from "./partials/AuthForm";

import "./Auth.css";

const apiURL = process.env.REACT_APP_API_URL;

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState({ success: "", error: "" });

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
      if (response.status === 200) {
        localStorage.setItem("refreshToken", responseData.refresh);
        localStorage.setItem("accessToken", responseData.access);
        localStorage.setItem("username", username);
        navigate("/");
      } else if (response.status === 201) {
        setIsRegister(false);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setMessage(responseData);
      } else if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 500
      ) {
        setPassword("");
        setConfirmPassword("");
        setMessage(responseData);
      } else {
        logErrorToServer(responseData, "Auth.jsx");
      }
    } catch (exception) {
      logErrorToServer(exception, "Exception in Auth.jsx");
    }
  };

  return (
    <div className="bg-image">
      <div className="content-container">
        <img src="/logo.png" alt="Logo" id="login-logo" />
        <AuthForm
          data={data}
          handleSubmit={handleSubmit}
          setUsername={setUsername}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setIsRegister={setIsRegister}
          isRegister={isRegister}
          setMessage={setMessage}
          message={message}
        />
      </div>
    </div>
  );
}
