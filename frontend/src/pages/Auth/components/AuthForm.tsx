import React, { useState, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

import Message from "./Message";

import { apiURL } from "../../../utils/constants";
import { getCsrfToken } from "../../../utils/authUtils";

import "./AuthForm.scss";

/**
 * FormData interface defines the structure for form data used in the AuthForm.
 */
interface FormData {
  username: string;
  password: string;
  passwordConfirm: string;
}

/**
 * ResponseData interface defines the structure for response data from the server.
 */
interface ResponseData {
  access?: string;
  username?: string;
  message: string;
}

/**
 * AuthForm component provides a user interface for authentication.
 *
 * It supports both login and registration functionalities, allowing users
 * to switch between them. It handles user input for username, password,
 * and password confirmation (for registration). Upon submission, it makes
 * a POST request to the appropriate endpoint and navigates the user based
 * on the response.
 */
export default function AuthForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "info">("info");

  /**
   * Toggles the form between login and registration modes.
   */
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      ...formData,
      password: "",
      passwordConfirm: "",
    });
  };

  /**
   * Handles form submission for login or registration.
   *
   * It constructs the API endpoint based on the current mode (login/register),
   * sends the form data to the server, and processes the response.
   * On successful login, it stores the access token and username in localStorage
   * and navigates to the next path or home page.
   *
   * @param {FormEvent<HTMLFormElement>} event - The form event triggered by submission.
   */
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const apiEndpoint = isRegister ? "user/register/" : "auth/login/";
      const response = await fetch(`${apiURL}${apiEndpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify(formData),
      });
      const responseData: ResponseData = await response.json();
      if (response.status === 200) {
        localStorage.setItem("accessToken", responseData.access || "");
        localStorage.setItem("username", responseData.username || "");
        navigate(sessionStorage.getItem("nextPath") || "/");
        sessionStorage.removeItem("nextPath");
      } else if (response.status === 201) {
        toggleForm();
        setMessage(responseData.message);
        setMessageType("info");
      } else if (response.status === 401) {
        setFormData({ ...formData, username: "", password: "" });
        setMessage(responseData.message);
        setMessageType("error");
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <Input
        id="username"
        type="text"
        label="Username"
        value={formData.username}
        onChange={(event) =>
          setFormData({ ...formData, username: event.target.value })
        }
        required
        maxlength={30}
        minlength={3}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
        required
        maxlength={50}
        minlength={6}
      />
      {isRegister && (
        <Input
          id="passwordConfirm"
          type="password"
          label="Confirm Password"
          value={formData.passwordConfirm}
          onChange={(event) =>
            setFormData({ ...formData, passwordConfirm: event.target.value })
          }
          required
          maxlength={50}
          minlength={6}
        />
      )}
      <Message message={message} type={messageType} />
      <Button type="submit" label={isRegister ? "Register" : "Login"} />
      <Button
        type="button"
        label={isRegister ? "Voltar" : "Criar Usuário"}
        onClick={() => toggleForm()}
      />
    </form>
  );
}
