import React, { useState, FormEvent } from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { apiURL } from "../../utils/constants";
import { getCsrfToken } from "../../utils/authUtils";

import "./AuthForm.scss";

// Define the shape of props expected by the AuthForm component.
interface FormData {
  username: string;
  password: string;
  passwordConfirm: string;
}

export default function AuthForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [isRegister, setIsRegister] = useState(false);

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
      const responseData = await response.json();
      if (response.status === 200) {
        localStorage.setItem("accessToken", responseData.access);
        localStorage.setItem("username", responseData.username);
        navigate(sessionStorage.getItem("nextPath") || "/");
        sessionStorage.removeItem("nextPath");
      } else if (response.status === 201) {
        console.log(responseData);
      } else {
        console.error(responseData);
      }
    } catch (error) {
      console.error(error);
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
        />
      )}
      <Button type="submit" label={isRegister ? "Register" : "Login"} />
      <Button
        type="button"
        label={isRegister ? "Voltar" : "Criar Usuário"}
        onClick={() => setIsRegister(!isRegister)}
      />
    </form>
  );
}
