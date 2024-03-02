import React, { useState, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";

import Message from "./Message";

import { apiURL } from "../../../apiUtils/constants";
import { getCsrfToken } from "../../../apiUtils/auth";

import "./AuthForm.scss";

/**
 * Provides a form interface for authentication, supporting both login and registration.
 * Users can input their credentials to either log in or register a new account.
 * The component dynamically adjusts based on the current mode (login or registration),
 * handling form submissions accordingly and navigating the user upon successful authentication.
 */
export default function AuthForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "info">("info");

  /**
   * Switches the form mode between login and registration, resetting relevant state.
   */
  const toggleForm = () => {
    setIsRegister(!isRegister);
    setMessage("");
    setFormData({
      ...formData,
      password: "",
      confirmPassword: "",
    });
  };

  /**
   * Submits the form data for authentication, either logging in the user or registering a new account.
   * Upon successful authentication, navigates the user to their intended destination.
   *
   * @param {FormEvent<HTMLFormElement>} event The form submission event.
   */
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const apiEndpoint = isRegister ? "users/register/" : "auth/login/";
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
        localStorage.setItem("accessToken", responseData.accessToken || "");
        localStorage.setItem("username", responseData.username || "");
        navigate(sessionStorage.getItem("nextPath") || "/");
      } else if (response.status === 201) {
        toggleForm();
        setMessageType("info");
        setMessage(responseData.message);
      } else if (isRegister && response.status === 400) {
        setFormData({ ...formData, password: "", confirmPassword: "" });
        setMessageType("error");
        setMessage(responseData.message);
      } else if (response.status === 401) {
        setFormData({ ...formData, username: "", password: "" });
        setMessageType("error");
        setMessage(responseData.message);
      } else {
        console.log("Errorssssssss:", responseData.message);
      }
    } catch (error) {
      console.log("Error:", error);
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
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          value={formData.confirmPassword}
          onChange={(event) =>
            setFormData({ ...formData, confirmPassword: event.target.value })
          }
          required
          maxlength={50}
          minlength={6}
        />
      )}
      <Message message={message} type={messageType} />
      <Button type="submit" label={isRegister ? "Registrar" : "Entrar"} />
      <Button
        type="button"
        label={isRegister ? "Voltar" : "Criar Usuário"}
        onClick={() => toggleForm()}
      />
    </form>
  );
}


/**
 * Defines the structure for form data used in the AuthForm.
 */
interface FormData {
  username: string; // The user's username.
  password: string; // The user's password.
  confirmPassword: string; // The user's password confirmation (for registration).
}

/**
 * Defines the structure for server response data.
 */
interface ResponseData {
  accessToken?: string; // The access token issued upon successful authentication.
  username?: string; // The username of the authenticated user.
  message: string; // A message from the server, indicating the result of the operation.
}