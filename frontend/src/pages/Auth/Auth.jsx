import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import useAuthCheck from "../../hooks/useAuthCheck";

import AuthForm from "./partials/AuthForm";

import { apiURL } from "../../utils/constants";
import { getCsrfToken } from "../../utils/authUtils";

import "./Auth.css";

export default function Auth(props) {
  useAuthCheck(props.url);

  const navigate = useNavigate();

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
    try {
      const apiEndpoint = `auth/${isRegister ? "register" : "login"}/`;
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        localStorage.setItem("accessToken", responseData.access);
        localStorage.setItem("refreshToken", responseData.refresh);
        localStorage.setItem("username", responseData.username);
        localStorage.setItem("userId", responseData.user_id);
        navigate(sessionStorage.getItem("next") || "/");
        sessionStorage.removeItem("next");
      }
      else if (response.status === 201) {
        setIsRegister(false);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setMessage(responseData)
      }
      else if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 409 ||
        response.status === 500
      ) {
        setPassword("");
        setConfirmPassword("");
        setMessage(responseData);
      }
    }
    catch (exception) {
      console.log(exception);
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
